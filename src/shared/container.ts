import { AuthService } from "../modules/auth/service/auth.service";
import { UserRepository } from "../modules/auth/repository/user.repository";
import { EmployeeRepository } from "../modules/employee/repository/employee.repository";
import { EmployeeService } from "../modules/employee/service/employee.service";
import { FaceRecognitionClient } from "./clients/face-recognition.client";
import { DeviceRepository } from "../modules/device/repository/device.repository";
import { DeviceService } from "../modules/device/service/device.service";
import { AttendanceRepository } from "../modules/attendance/repository/attendance.repository";
import { AttendanceService } from "../modules/attendance/service/attendance.service";
import { AttendanceSyncService } from "../modules/attendance/service/attendance-sync.service";
import { AttendanceVerificationService } from "../modules/attendance/service/attendance-verification.service";
import { AttendanceRetrySchedulerService } from "../modules/attendance/service/attendance-retry-scheduler.service";
import { SettingsRepository } from "../modules/settings/repository/settings.repository";
import { SettingsService } from "../modules/settings/service/settings.service";

const faceRecognitionClient = new FaceRecognitionClient();
const userRepository = new UserRepository();
const employeeRepository = new EmployeeRepository();
const deviceRepository = new DeviceRepository();
const attendanceRepository = new AttendanceRepository();
const settingsRepository = new SettingsRepository();

export const authService = new AuthService(userRepository);
export const employeeService = new EmployeeService(employeeRepository, faceRecognitionClient);
export const deviceService = new DeviceService(deviceRepository);
export const settingsService = new SettingsService(settingsRepository);
export const attendanceVerificationService = new AttendanceVerificationService(
  attendanceRepository,
  employeeRepository,
  faceRecognitionClient,
  settingsService
);
export const attendanceRetryScheduler = new AttendanceRetrySchedulerService(
  attendanceRepository,
  attendanceVerificationService
);
export const attendanceSyncService = new AttendanceSyncService(
  attendanceRepository,
  attendanceRetryScheduler
);
export const attendanceService = new AttendanceService(
  attendanceRepository,
  deviceService,
  attendanceSyncService
);
