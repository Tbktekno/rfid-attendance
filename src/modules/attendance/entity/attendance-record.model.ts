export interface AttendanceRecordRow {
  id: string;
  session_id: string;
  employee_id: string | null;
  rfid_uid: string;
  status: "VALID" | "INVALID";
  punctuality: "ON_TIME" | "LATE" | "EARLY_EXIT" | "BOLOS" | null;
  category: "ENTRY" | "EXIT" | null;
  confidence: number | null;
  reason: string | null;
  image_path: string | null;
  rfid_device_code: string | null;
  face_device_code: string | null;
  verified_at: string;
  raw_payload: string | null;
  created_at: string;
  updated_at: string;
}
