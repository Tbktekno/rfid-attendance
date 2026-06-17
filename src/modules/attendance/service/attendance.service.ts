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
    const rawData = await this.attendanceRepository.listHistory({
      status: (input.status || undefined) as "VALID" | "INVALID" | undefined,
      employeeId: input.employeeId,
      limit: input.limit,
      page: input.page,
      date: input.date,
      month: input.month
    });

    if (input.employeeId && input.month) {
      const { parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend, format } = require("date-fns");
      
      const monthStart = startOfMonth(parseISO(input.month + "-01"));
      const monthEnd = endOfMonth(monthStart);
      const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
      const weekdays = allDays.filter((day: Date) => !isWeekend(day));
      
      const recordsByDate = new Map();
      for (const record of rawData.records) {
        // Only take the first valid record of the day to represent attendance, or just all records?
        // Usually, monthly reports show one line per day. If they have ENTRY and EXIT, maybe we just show ENTRY.
        // For simplicity, we just take the first record we find for that day. 
        const dateStr = format(record.verifiedAt, "yyyy-MM-dd");
        if (!recordsByDate.has(dateStr)) {
           recordsByDate.set(dateStr, record);
        }
      }

      const interpolatedRecords = [];
      const employeeName = rawData.records.length > 0 ? rawData.records[0].employeeName : "";

      for (const day of weekdays) {
        const dateStr = format(day, "yyyy-MM-dd");
        if (recordsByDate.has(dateStr)) {
          interpolatedRecords.push(recordsByDate.get(dateStr));
        } else {
          // If we are looking at the future days of the current month, we probably shouldn't mark them as BOLOS yet.
          // But for simplicity, we mark everything without records in the month as BOLOS.
          // Let's improve it: only mark BOLOS if the date is in the past or today.
          if (day <= new Date()) {
            interpolatedRecords.push({
               id: "dummy-" + dateStr,
               sessionId: "",
               employeeId: input.employeeId,
               employeeName: employeeName,
               rfidUid: "-",
               status: "INVALID",
               punctuality: "BOLOS",
               category: "",
               confidence: 0,
               reason: "Tidak Hadir",
               verifiedAt: day,
               createdAt: day
            });
          }
        }
      }
      
      interpolatedRecords.sort((a, b) => b.verifiedAt.getTime() - a.verifiedAt.getTime());

      // If page and limit are specified, we should probably slice it.
      // But since it's a monthly export/view, it's usually < 30 days. Let's slice it to match pagination behavior.
      const offset = (input.page! - 1) * input.limit!;
      const paginatedRecords = interpolatedRecords.slice(offset, offset + input.limit!);

      return {
        records: paginatedRecords,
        totalRecords: interpolatedRecords.length
      };
    }

    return rawData;
  }

  async getSessions(input: AttendanceSessionsDto) {
    return this.attendanceRepository.listSessions({
      status: (input.status || undefined) as any,
      limit: input.limit
    });
  }
}
