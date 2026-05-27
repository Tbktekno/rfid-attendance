export interface AttendanceSessionEntity {
  id: string;
  correlationId: string;
  pairingKey?: string;
  rfidUid?: string;
  rfidDeviceCode?: string;
  faceDeviceCode?: string;
  faceImagePath?: string;
  verificationQueued: boolean;
  verificationAttempts: number;
  status: "PENDING" | "READY" | "VERIFIED" | "FAILED" | "EXPIRED";
  reason?: string;
  startedAt: Date;
  lastEventAt: Date;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceSessionRow {
  id: string;
  correlation_id: string;
  pairing_key: string | null;
  rfid_uid: string | null;
  rfid_device_code: string | null;
  face_device_code: string | null;
  face_image_path: string | null;
  verification_queued: number;
  verification_attempts: number;
  status: "PENDING" | "READY" | "VERIFIED" | "FAILED" | "EXPIRED";
  reason: string | null;
  started_at: string;
  last_event_at: string;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export const mapAttendanceSessionEntity = (row: AttendanceSessionRow): AttendanceSessionEntity => ({
  id: row.id,
  correlationId: row.correlation_id,
  pairingKey: row.pairing_key ?? undefined,
  rfidUid: row.rfid_uid ?? undefined,
  rfidDeviceCode: row.rfid_device_code ?? undefined,
  faceDeviceCode: row.face_device_code ?? undefined,
  faceImagePath: row.face_image_path ?? undefined,
  verificationQueued: Boolean(row.verification_queued),
  verificationAttempts: Number(row.verification_attempts),
  status: row.status,
  reason: row.reason ?? undefined,
  startedAt: new Date(row.started_at),
  lastEventAt: new Date(row.last_event_at),
  verifiedAt: row.verified_at ? new Date(row.verified_at) : undefined,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at)
});
