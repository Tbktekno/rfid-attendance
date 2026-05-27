export type AttendanceStatus = "VALID" | "INVALID";
export type SessionStatus = "PENDING" | "READY" | "VERIFIED" | "FAILED" | "EXPIRED";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Employee {
  id: string;
  fullName: string;
  department: string;
  position: string;
  rfidUid: string;
  faceImagePath: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Aliases for backward compatibility
  studentCode?: string;
  className?: string;
  name?: string;
}

export interface Device {
  id: string;
  deviceCode: string;
  type: "ESP8266" | "ESP32CAM" | "GATEWAY";
  name: string;
  location: string;
  status: "ONLINE" | "OFFLINE" | "ERROR";
  lastSeenAt: string;
  metadataJson: string;
  isOnline: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  employeeId: string;
  employeeName: string;
  rfidUid: string;
  status: AttendanceStatus;
  punctuality?: "ON_TIME" | "LATE" | "EARLY_EXIT" | "BOLOS";
  category?: "ENTRY" | "EXIT";
  confidence: number;
  reason: string;
  imagePath: string;
  rfidDeviceCode: string;
  faceDeviceCode: string;
  verifiedAt: string;
  createdAt: string;
  // Aliases for backward compatibility
  studentId?: string;
  studentName?: string;
  studentCode?: string;
}

export interface AttendanceSession {
  id: string;
  correlationId: string;
  pairingKey: string;
  rfidUid: string;
  rfidDeviceCode: string;
  faceDeviceCode: string;
  faceImagePath: string;
  verificationQueued: boolean;
  verificationAttempts: number;
  status: SessionStatus;
  reason: string;
  startedAt: string;
  lastEventAt: string;
  verifiedAt: string;
}

export interface RealtimeMessage {
  channel?: "attendance" | "device";
  type: string;
  payload: Record<string, string | undefined>;
}

export interface AttendanceSummary {
  totalToday: number;
  validToday: number;
  invalidToday: number;
  activeSessions: number;
  onlineDevices: number;
  verificationRate: number;
}

export interface ToastMessage {
  id: string;
  kind: "success" | "error" | "info";
  title: string;
  description: string;
}
