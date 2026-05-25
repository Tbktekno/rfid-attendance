import { env } from "../../../config/env";
import { resolveCorrelationId } from "../../../shared/utils/correlation";
import { DeviceService } from "../../device/service/device.service";
import { AttendanceHistoryDto, AttendanceSessionsDto, FaceEventDto, RfidEventDto } from "../dto/attendance.dto";
import { AttendanceRepository } from "../repository/attendance.repository";
import { AttendanceSyncService } from "./attendance-sync.service";
import { realtimeEvents } from "../../../shared/realtime/realtime-events";

export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly deviceService: DeviceService,
    private readonly attendanceSyncService: AttendanceSyncService
  ) {}

  async enqueueRfidEvent(input: RfidEventDto) {
    const correlationId = resolveCorrelationId({
      correlationId: input.correlationId,
      pairingKey: input.pairingKey,
      deviceCode: input.deviceCode,
      capturedAt: input.capturedAt,
      windowSeconds: env.ATTENDANCE_MATCH_WINDOW_SECONDS
    });

    await this.deviceService.touchFromAttendance({
      deviceCode: input.deviceCode,
      type: "ESP8266"
    });

    await this.attendanceSyncService.synchronizeEvent({
      type: "RFID",
      uid: input.uid,
      deviceCode: input.deviceCode,
      pairingKey: input.pairingKey,
      correlationId,
      capturedAt: (input.capturedAt && input.capturedAt !== "") ? input.capturedAt : new Date().toISOString()
    });

    realtimeEvents.publish({
      channel: "device",
      type: "device.rfid.scanned",
      payload: {
        uid: input.uid,
        deviceCode: input.deviceCode
      }
    });

    return {
      message: "RFID event processed",
      correlationId
    };
  }

  async enqueueFaceEvent(input: FaceEventDto) {
    const correlationId = resolveCorrelationId({
      correlationId: input.correlationId,
      pairingKey: input.pairingKey,
      deviceCode: input.deviceCode,
      capturedAt: input.capturedAt,
      windowSeconds: env.ATTENDANCE_MATCH_WINDOW_SECONDS
    });

    await this.deviceService.touchFromAttendance({
      deviceCode: input.deviceCode,
      type: "ESP32CAM"
    });

    await this.attendanceSyncService.synchronizeEvent({
      type: "FACE",
      uid: input.uid,
      imagePath: input.imagePath,
      deviceCode: input.deviceCode,
      pairingKey: input.pairingKey,
      correlationId,
      capturedAt: (input.capturedAt && input.capturedAt !== "") ? input.capturedAt : new Date().toISOString()
    });

    return {
      message: "Face event processed",
      correlationId
    };
  }

  async getHistory(input: AttendanceHistoryDto) {
    return this.attendanceRepository.listHistory({
      status: (input.status || undefined) as "VALID" | "INVALID" | undefined,
      employeeId: input.employeeId,
      limit: input.limit,
      page: input.page,
      date: input.date
    });
  }

  async getSessions(input: AttendanceSessionsDto) {
    return this.attendanceRepository.listSessions({
      status: (input.status || undefined) as any,
      limit: input.limit
    });
  }
}
