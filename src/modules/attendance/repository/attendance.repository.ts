import { v4 as uuid } from "uuid";
import { sqlite } from "../../../shared/database/sqlite";
import {
  AttendanceSessionEntity,
  AttendanceSessionRow,
  mapAttendanceSessionEntity
} from "../entity/attendance-session.model";
import { AttendanceRecordRow } from "../entity/attendance-record.model";

export class AttendanceRepository {
  async upsertRfidEvent(input: {
    correlationId: string;
    pairingKey?: string;
    uid: string;
    deviceCode: string;
    capturedAt: Date;
  }): Promise<AttendanceSessionEntity> {
    const existing = this.findSessionRowByCorrelationId(input.correlationId);
    const now = new Date().toISOString();
    const capturedAt = input.capturedAt.toISOString();

    if (existing) {
      await sqlite.run(
        `UPDATE attendance_sessions
         SET pairing_key = ?, rfid_uid = ?, rfid_device_code = ?, last_event_at = ?, updated_at = ?
         WHERE correlation_id = ?`,
        [input.pairingKey ?? existing.pairing_key, input.uid, input.deviceCode, capturedAt, now, input.correlationId]
      );
    } else {
      const id = uuid();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      await sqlite.run(
        `INSERT INTO attendance_sessions (
          id, correlation_id, pairing_key, rfid_uid, rfid_device_code, face_device_code, face_image_path,
          verification_queued, verification_attempts, status, reason, started_at, last_event_at, verified_at, expires_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          input.correlationId,
          input.pairingKey ?? null,
          input.uid,
          input.deviceCode,
          null,
          null,
          0,
          0,
          "PENDING",
          null,
          capturedAt,
          capturedAt,
          null,
          expiresAt,
          now,
          now
        ]
      );
    }

    return (await this.findSessionByCorrelationId(input.correlationId)) as AttendanceSessionEntity;
  }

  async upsertFaceEvent(input: {
    correlationId: string;
    pairingKey?: string;
    imagePath: string;
    deviceCode: string;
    capturedAt: Date;
    uid?: string;
  }): Promise<AttendanceSessionEntity> {
    const existing = this.findSessionRowByCorrelationId(input.correlationId);
    const now = new Date().toISOString();
    const capturedAt = input.capturedAt.toISOString();

    if (existing) {
      await sqlite.run(
        `UPDATE attendance_sessions
         SET pairing_key = ?, face_image_path = ?, face_device_code = ?, rfid_uid = COALESCE(rfid_uid, ?), last_event_at = ?, updated_at = ?
         WHERE correlation_id = ?`,
        [
          input.pairingKey ?? existing.pairing_key,
          input.imagePath,
          input.deviceCode,
          input.uid ?? null,
          capturedAt,
          now,
          input.correlationId
        ]
      );
    } else {
      const id = uuid();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      await sqlite.run(
        `INSERT INTO attendance_sessions (
          id, correlation_id, pairing_key, rfid_uid, rfid_device_code, face_device_code, face_image_path,
          verification_queued, verification_attempts, status, reason, started_at, last_event_at, verified_at, expires_at, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          input.correlationId,
          input.pairingKey ?? null,
          input.uid ?? null,
          null,
          input.deviceCode,
          input.imagePath,
          0,
          0,
          "PENDING",
          null,
          capturedAt,
          capturedAt,
          null,
          expiresAt,
          now,
          now
        ]
      );
    }

    return (await this.findSessionByCorrelationId(input.correlationId)) as AttendanceSessionEntity;
  }

  async findSessionById(id: string): Promise<AttendanceSessionEntity | null> {
    const row = sqlite.get<AttendanceSessionRow>(
      `SELECT id, correlation_id, pairing_key, rfid_uid, rfid_device_code, face_device_code, face_image_path,
              verification_queued, verification_attempts, status, reason, started_at, last_event_at, verified_at, created_at, updated_at
       FROM attendance_sessions
       WHERE id = ?`,
      [id]
    );

    return row ? mapAttendanceSessionEntity(row) : null;
  }

  async findSessionByCorrelationId(correlationId: string): Promise<AttendanceSessionEntity | null> {
    const row = this.findSessionRowByCorrelationId(correlationId);
    return row ? mapAttendanceSessionEntity(row) : null;
  }

  async markReadyForVerification(sessionId: string): Promise<void> {
    await sqlite.run(
      `UPDATE attendance_sessions
       SET status = ?, verification_queued = ?, updated_at = ?
       WHERE id = ?`,
      ["READY", 1, new Date().toISOString(), sessionId]
    );
  }

  async incrementVerificationAttempts(sessionId: string): Promise<void> {
    await sqlite.run(
      `UPDATE attendance_sessions
       SET verification_attempts = verification_attempts + 1, updated_at = ?
       WHERE id = ?`,
      [new Date().toISOString(), sessionId]
    );
  }

  async completeSession(input: { sessionId: string; reason?: string }): Promise<void> {
    const now = new Date().toISOString();
    await sqlite.run(
      `UPDATE attendance_sessions
       SET status = ?, reason = ?, verified_at = ?, verification_queued = ?, updated_at = ?
       WHERE id = ?`,
      ["VERIFIED", input.reason ?? null, now, 0, now, input.sessionId]
    );
  }

  async failSession(sessionId: string, reason: string): Promise<void> {
    await sqlite.run(
      `UPDATE attendance_sessions
       SET status = ?, reason = ?, verification_queued = ?, updated_at = ?
       WHERE id = ?`,
      ["FAILED", reason, 0, new Date().toISOString(), sessionId]
    );
  }

  async saveAttendanceRecord(input: {
    sessionId: string;
    employeeId?: string;
    rfidUid: string;
    status: "VALID" | "INVALID";
    confidence?: number;
    reason?: string;
    imagePath?: string;
    rfidDeviceCode?: string;
    faceDeviceCode?: string;
    punctuality?: "ON_TIME" | "LATE" | "EARLY_EXIT" | "BOLOS";
    category?: "ENTRY" | "EXIT";
    rawPayload?: Record<string, unknown>;
  }): Promise<void> {
    const existing = sqlite.get<{ id: string }>(
      `SELECT id FROM attendance_records WHERE session_id = ?`,
      [input.sessionId]
    );

    const now = new Date().toISOString();

    if (existing) {
      await sqlite.run(
        `UPDATE attendance_records
         SET employee_id = ?, rfid_uid = ?, status = ?, punctuality = ?, category = ?, confidence = ?, reason = ?, image_path = ?, rfid_device_code = ?, face_device_code = ?, verified_at = ?, raw_payload = ?, updated_at = ?
         WHERE session_id = ?`,
        [
          input.employeeId ?? null,
          input.rfidUid,
          input.status,
          input.punctuality ?? null,
          input.category ?? null,
          input.confidence ?? null,
          input.reason ?? null,
          input.imagePath ?? null,
          input.rfidDeviceCode ?? null,
          input.faceDeviceCode ?? null,
          now,
          input.rawPayload ? JSON.stringify(input.rawPayload) : null,
          now,
          input.sessionId
        ]
      );
      return;
    }

    await sqlite.run(
      `INSERT INTO attendance_records (
        id, session_id, employee_id, rfid_uid, status, punctuality, category, confidence, reason, image_path,
        rfid_device_code, face_device_code, verified_at, raw_payload, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuid(),
        input.sessionId,
        input.employeeId ?? null,
        input.rfidUid,
        input.status,
        input.punctuality ?? null,
        input.category ?? null,
        input.confidence ?? null,
        input.reason ?? null,
        input.imagePath ?? null,
        input.rfidDeviceCode ?? null,
        input.faceDeviceCode ?? null,
        now,
        input.rawPayload ? JSON.stringify(input.rawPayload) : null,
        now,
        now
      ]
    );
  }

  async findTodayRecord(employeeId: string): Promise<{ category: string } | null> {
    return sqlite.get<{ category: string }>(
      `SELECT category FROM attendance_records 
       WHERE employee_id = ? 
       AND status = 'VALID' 
       AND date(verified_at, 'localtime') = date('now', 'localtime')
       ORDER BY verified_at DESC LIMIT 1`,
      [employeeId]
    );
  }

  async listHistory(input: {
    status?: "VALID" | "INVALID";
    employeeId?: string;
    date?: string;
    month?: string;
    limit: number;
    page: number;
  }): Promise<{
    records: Array<{
      id: string;
      sessionId: string;
      employeeId?: string;
      employeeName?: string;
      rfidUid: string;
      status: "VALID" | "INVALID";
      punctuality?: "ON_TIME" | "LATE" | "EARLY_EXIT" | "BOLOS";
      category?: "ENTRY" | "EXIT";
      confidence?: number;
      reason?: string;
      imagePath?: string;
      rfidDeviceCode?: string;
      faceDeviceCode?: string;
      verifiedAt: Date;
      createdAt: Date;
    }>;
    totalRecords: number;
  }> {
    const offset = (input.page - 1) * input.limit;

    const countRow = sqlite.get<{ total: number }>(
      `SELECT COUNT(*) as total
       FROM attendance_records ar
       WHERE (? IS NULL OR ar.status = ?)
         AND (? IS NULL OR ar.employee_id = ?)
         AND (? IS NULL OR date(ar.verified_at, 'localtime') = date(?))
         AND (? IS NULL OR strftime('%Y-%m', ar.verified_at, 'localtime') = ?)`,
      [
        input.status ?? null,
        input.status ?? null,
        input.employeeId ?? null,
        input.employeeId ?? null,
        input.date ?? null,
        input.date ?? null,
        input.month ?? null,
        input.month ?? null
      ]
    );

    const rows = sqlite.all<
      AttendanceRecordRow & {
        employee_name: string | null;
      }
    >(
      `SELECT ar.id, ar.session_id, ar.employee_id, ar.rfid_uid, ar.status, ar.punctuality, ar.category, ar.confidence, ar.reason, ar.image_path,
              ar.rfid_device_code, ar.face_device_code, ar.verified_at, ar.raw_payload, ar.created_at, ar.updated_at,
              e.full_name AS employee_name
       FROM attendance_records ar
       LEFT JOIN employees e ON e.id = ar.employee_id
       WHERE (? IS NULL OR ar.status = ?)
         AND (? IS NULL OR ar.employee_id = ?)
         AND (? IS NULL OR date(ar.verified_at, 'localtime') = date(?))
         AND (? IS NULL OR strftime('%Y-%m', ar.verified_at, 'localtime') = ?)
       ORDER BY ar.verified_at DESC
       LIMIT ? OFFSET ?`,
      [
        input.status ?? null,
        input.status ?? null,
        input.employeeId ?? null,
        input.employeeId ?? null,
        input.date ?? null,
        input.date ?? null,
        input.month ?? null,
        input.month ?? null,
        input.limit,
        offset
      ]
    );

    const records = rows.map((row) => ({
      id: row.id,
      sessionId: row.session_id,
      employeeId: row.employee_id ?? undefined,
      employeeName: row.employee_name ?? undefined,
      rfidUid: row.rfid_uid,
      status: row.status,
      punctuality: (row.punctuality as any) ?? undefined,
      category: row.category ?? undefined,
      confidence: row.confidence ?? undefined,
      reason: row.reason ?? undefined,
      imagePath: row.image_path ?? undefined,
      rfidDeviceCode: row.rfid_device_code ?? undefined,
      faceDeviceCode: row.face_device_code ?? undefined,
      verifiedAt: new Date(row.verified_at),
      createdAt: new Date(row.created_at)
    }));

    return {
      records,
      totalRecords: countRow?.total ?? 0
    };
  }

  async listSessions(input: {
    status?: "PENDING" | "READY" | "VERIFIED" | "FAILED" | "EXPIRED";
    limit: number;
  }): Promise<AttendanceSessionEntity[]> {
    const rows = sqlite.all<AttendanceSessionRow>(
      `SELECT id, correlation_id, pairing_key, rfid_uid, rfid_device_code, face_device_code, face_image_path,
              verification_queued, verification_attempts, status, reason, started_at, last_event_at, verified_at, created_at, updated_at
       FROM attendance_sessions
       WHERE (? IS NULL OR status = ?)
       ORDER BY created_at DESC
       LIMIT ?`,
      [input.status ?? null, input.status ?? null, input.limit]
    );

    return rows.map(mapAttendanceSessionEntity);
  }

  async listPendingVerificationSessionIds(): Promise<string[]> {
    const rows = sqlite.all<{ id: string }>(
      `SELECT id
       FROM attendance_sessions
       WHERE (status = 'READY' OR (status = 'PENDING' AND rfid_uid IS NOT NULL AND face_image_path IS NOT NULL))
       ORDER BY updated_at ASC`
    );

    return rows.map((row) => row.id);
  }

  private findSessionRowByCorrelationId(correlationId: string): AttendanceSessionRow | null {
    return sqlite.get<AttendanceSessionRow>(
      `SELECT id, correlation_id, pairing_key, rfid_uid, rfid_device_code, face_device_code, face_image_path,
              verification_queued, verification_attempts, status, reason, started_at, last_event_at, verified_at, created_at, updated_at
       FROM attendance_sessions
       WHERE correlation_id = ?`,
      [correlationId]
    );
  }
}
