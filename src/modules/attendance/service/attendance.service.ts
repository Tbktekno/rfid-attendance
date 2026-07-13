import { env } from "../../../config/env";
import { resolveCorrelationId } from "../../../shared/utils/correlation";
import { DeviceService } from "../../device/service/device.service";
import { AttendanceHistoryDto, AttendanceReportRecord, AttendanceSessionsDto, FaceEventDto, RfidEventDto } from "../dto/attendance.dto";
import { AttendanceRepository } from "../repository/attendance.repository";
import { AttendanceSyncService } from "./attendance-sync.service";
import { SettingsService } from "../../settings/service/settings.service";
import { realtimeEvents } from "../../../shared/realtime/realtime-events";

export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly deviceService: DeviceService,
    private readonly attendanceSyncService: AttendanceSyncService,
    private readonly settingsService?: SettingsService
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

    if (input.view === "report" && input.employeeId && input.month) {
      return this.buildMonthlyReport(rawData.records, input);
    }

    return rawData;
  }

  private isWorkingDay(day: Date, workingDayIndices: number[], holidayDateSet: Set<string>, format: Function): boolean {
    const dayOfWeek = day.getDay(); // 0=Minggu, 1=Senin, ..., 6=Sabtu
    const dateStr = format(day, "yyyy-MM-dd");
    return workingDayIndices.includes(dayOfWeek) && !holidayDateSet.has(dateStr);
  }

  private async buildMonthlyReport(
    records: AttendanceReportRecord[],
    input: AttendanceHistoryDto
  ): Promise<{ records: AttendanceReportRecord[]; totalRecords: number }> {
    const { parseISO, startOfMonth, endOfMonth, eachDayOfInterval, format } = require("date-fns");
    
    // Baca pengaturan hari kerja & hari libur dari database
    let workingDayIndices = [1, 2, 3, 4, 5]; // default Senin-Jumat
    let holidayDateSet = new Set<string>();

    if (this.settingsService) {
      try {
        const settings = await this.settingsService.getSettings();
        if (settings.working_days) {
          workingDayIndices = settings.working_days.split(",").map(Number).filter(n => !isNaN(n));
        }
        if (settings.holidays) {
          const parsed = JSON.parse(settings.holidays);
          if (Array.isArray(parsed)) {
            holidayDateSet = new Set(parsed);
          }
        }
      } catch {
        // fallback ke default jika gagal baca settings
      }
    }

    const monthStart = startOfMonth(parseISO(input.month + "-01"));
    const monthEnd = endOfMonth(monthStart);
    const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Filter hanya hari yang termasuk dalam working_days DAN tidak ada di holidays
    const workDays = allDays.filter((day: Date) => this.isWorkingDay(day, workingDayIndices, holidayDateSet, format));
    
    const recordsByDate = new Map<string, AttendanceReportRecord[]>();
    for (const record of records) {
      const dateStr = format(record.verifiedAt, "yyyy-MM-dd");
      if (!recordsByDate.has(dateStr)) {
         recordsByDate.set(dateStr, []);
      }
      recordsByDate.get(dateStr)!.push(record);
    }

    const interpolatedRecords: AttendanceReportRecord[] = [];
    const employeeName = records.length > 0 ? records[0].employeeName : "";

    for (const day of workDays) {
      const dateStr = format(day, "yyyy-MM-dd");
      if (recordsByDate.has(dateStr)) {
        const dayRecords = recordsByDate.get(dateStr)!;
        // Sort by time ascending
        dayRecords.sort((a, b) => a.verifiedAt.getTime() - b.verifiedAt.getTime());
        
        const first = dayRecords[0];
        const last = dayRecords[dayRecords.length - 1];
        
        const entryRec = dayRecords.find(r => r.category === "ENTRY") || (first.category !== "EXIT" ? first : undefined);
        const exitRec = dayRecords.find(r => r.category === "EXIT") || (dayRecords.length > 1 ? last : undefined);

        let entryTime: string | undefined = undefined;
        let exitTime: string | undefined = undefined;

        if (entryRec) entryTime = format(entryRec.verifiedAt, "HH:mm:ss");
        if (exitRec && exitRec !== entryRec) exitTime = format(exitRec.verifiedAt, "HH:mm:ss");

        const baseRec = entryRec || first;

        interpolatedRecords.push({
          ...baseRec,
          entryTime,
          exitTime
        });
      } else {
        if (day <= new Date()) {
          interpolatedRecords.push({
             id: "dummy-" + dateStr,
             sessionId: "",
             employeeId: input.employeeId!,
             employeeName: employeeName,
             rfidUid: "-",
             status: "INVALID",
             punctuality: "BOLOS",
             category: undefined,
             entryTime: "-",
             exitTime: "-",
             confidence: 0,
             reason: "Tidak Hadir",
             verifiedAt: day,
             createdAt: day
          });
        }
      }
    }
    
    interpolatedRecords.sort((a, b) => b.verifiedAt.getTime() - a.verifiedAt.getTime());

    const offset = (input.page! - 1) * input.limit!;
    const paginatedRecords = interpolatedRecords.slice(offset, offset + input.limit!);

    return {
      records: paginatedRecords,
      totalRecords: interpolatedRecords.length
    };
  }

  async getSessions(input: AttendanceSessionsDto) {
    return this.attendanceRepository.listSessions({
      status: (input.status || undefined) as any,
      limit: input.limit
    });
  }

  async deleteSession(id: string): Promise<void> {
    const session = await this.attendanceRepository.findSessionById(id);
    if (!session) {
      throw new Error("Sesi tidak ditemukan");
    }
    await this.attendanceRepository.deleteSessionById(id);
  }
}
