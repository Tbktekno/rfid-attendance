import { AttendanceRepository } from "../repository/attendance.repository";
import { AttendanceRetrySchedulerService } from "./attendance-retry-scheduler.service";
import { realtimeEvents } from "../../../shared/realtime/realtime-events";

export class AttendanceSyncService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly attendanceRetryScheduler: AttendanceRetrySchedulerService
  ) {}

  async synchronizeEvent(payload: {
    type: "RFID" | "FACE";
    correlationId: string;
    pairingKey?: string;
    uid?: string;
    imagePath?: string;
    deviceCode: string;
    capturedAt: string;
  }): Promise<void> {
    const capturedAt = new Date(payload.capturedAt);
    
    // Normalisasi UID agar konsisten (Hapus spasi & Uppercase)
    const normalizedUid = payload.uid ? payload.uid.replace(/\s+/g, "").toUpperCase() : undefined;

    const session =
      payload.type === "RFID"
        ? await this.attendanceRepository.upsertRfidEvent({
            correlationId: payload.correlationId,
            pairingKey: payload.pairingKey,
            uid: normalizedUid ?? "",
            deviceCode: payload.deviceCode,
            capturedAt
          })
        : await this.attendanceRepository.upsertFaceEvent({
            correlationId: payload.correlationId,
            pairingKey: payload.pairingKey,
            imagePath: payload.imagePath ?? "",
            deviceCode: payload.deviceCode,
            capturedAt,
            uid: normalizedUid
          });

    realtimeEvents.publish({
      channel: "attendance",
      type: "attendance.session.updated",
      payload: {
        sessionId: session.id,
        correlationId: session.correlationId
      }
    });

    if (session.rfidUid && session.faceImagePath && !session.verificationQueued) {
      await this.attendanceRepository.markReadyForVerification(session.id);
      realtimeEvents.publish({
        channel: "attendance",
        type: "attendance.session.updated",
        payload: {
          sessionId: session.id,
          correlationId: session.correlationId
        }
      });
      this.attendanceRetryScheduler.schedule(session.id);
    }
  }
}
