import { StatusCodes } from "http-status-codes";
import { FaceRecognitionClient } from "../../../shared/clients/face-recognition.client";
import { AppError } from "../../../shared/errors/app-error";
import { realtimeEvents } from "../../../shared/realtime/realtime-events";
import { EmployeeRepository } from "../../employee/repository/employee.repository";
import { AttendanceRepository } from "../repository/attendance.repository";
import { SettingsService } from "../../settings/service/settings.service";

export class AttendanceVerificationService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly faceRecognitionClient: FaceRecognitionClient,
    private readonly settingsService: SettingsService
  ) {}

  async verify(sessionId: string): Promise<void> {
    const session = await this.attendanceRepository.findSessionById(sessionId);
    if (!session) {
      throw new AppError(StatusCodes.NOT_FOUND, "Attendance session not found");
    }

    if (!session.rfidUid || !session.faceImagePath) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Attendance session is incomplete");
    }

    await this.attendanceRepository.incrementVerificationAttempts(session.id);

    const employee = await this.employeeRepository.findByRfidUid(session.rfidUid);
    if (!employee) {
      await this.attendanceRepository.completeSession({
        sessionId: session.id,
        reason: "RFID UID is not registered"
      });
      realtimeEvents.publish({
        channel: "attendance",
        type: "attendance.verification.completed",
        payload: {
          sessionId: session.id,
          correlationId: session.correlationId,
          status: "INVALID"
        }
      });
      return;
    }

    if (!employee.faceDescriptor?.length) {
      await this.attendanceRepository.completeSession({
        sessionId: session.id,
        reason: "Employee face descriptor is not registered"
      });
      realtimeEvents.publish({
        channel: "attendance",
        type: "attendance.verification.completed",
        payload: {
          sessionId: session.id,
          correlationId: session.correlationId,
          status: "INVALID"
        }
      });
      return;
    }

    const verification = await this.faceRecognitionClient.verifyFace({
      imagePath: session.faceImagePath,
      referenceDescriptor: employee.faceDescriptor
    });

    const status = verification.isMatch ? "VALID" : "INVALID";
    let reason = verification.isMatch ? "RFID and face verified" : "Face does not match registered employee";

    let punctuality: "ON_TIME" | "LATE" | "EARLY_EXIT" | "BOLOS" | undefined;
    let category: "ENTRY" | "EXIT" | undefined;

    if (verification.isMatch) {
      const settings = await this.settingsService.getSettings();
      const lastRecord = await this.attendanceRepository.findTodayRecord(employee.id);
      
      const now = new Date();
      const timeStr = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

      if (!lastRecord || lastRecord.category === "EXIT") {
        category = "ENTRY";
        punctuality = timeStr <= settings.entry_time ? "ON_TIME" : "LATE";
      } else {
        category = "EXIT";
        
        const [exitH, exitM] = settings.exit_time.split(":").map(Number);
        const exitTimeDate = new Date();
        exitTimeDate.setHours(exitH, exitM, 0, 0);
        
        const tenMinutesBeforeExit = new Date(exitTimeDate.getTime() - 10 * 60 * 1000);
        
        if (now < tenMinutesBeforeExit) {
          punctuality = "BOLOS";
          reason = "Bolos (Pulang terlalu awal > 10 menit)";
        } else if (now < exitTimeDate) {
          punctuality = "EARLY_EXIT";
          reason = "Pulang awal (dalam toleransi 10 menit)";
        } else {
          punctuality = "ON_TIME";
        }
      }
    }

    if (status === "VALID") {
      await this.attendanceRepository.saveAttendanceRecord({
        sessionId: session.id,
        employeeId: employee.id,
        rfidUid: session.rfidUid,
        status,
        punctuality,
        category,
        confidence: verification.confidence,
        reason,
        imagePath: session.faceImagePath,
        rfidDeviceCode: session.rfidDeviceCode,
        faceDeviceCode: session.faceDeviceCode,
        rawPayload: {
          distance: verification.distance
        }
      });
    }

    await this.attendanceRepository.completeSession({
      sessionId: session.id,
      reason
    });
    realtimeEvents.publish({
      channel: "attendance",
      type: "attendance.verification.completed",
      payload: {
        sessionId: session.id,
        correlationId: session.correlationId,
        status: status
      }
    });
  }

  async markFailed(sessionId: string, reason: string): Promise<void> {
    await this.attendanceRepository.failSession(sessionId, reason);
    const session = await this.attendanceRepository.findSessionById(sessionId);
    realtimeEvents.publish({
      channel: "attendance",
      type: "attendance.verification.failed",
      payload: {
        sessionId,
        correlationId: session?.correlationId
      }
    });
  }
}
