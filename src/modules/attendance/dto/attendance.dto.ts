import { z } from "zod";

export const rfidEventSchema = z.object({
  uid: z.string().min(3),
  deviceCode: z.string().min(2),
  pairingKey: z.string().optional(),
  correlationId: z.string().optional(),
  capturedAt: z.string().optional()
});

export const faceEventSchema = z.object({
  uid: z.string().optional(),
  imagePath: z.string().optional(),
  imageBase64: z.string().optional(),
  deviceCode: z.string().min(2),
  pairingKey: z.string().optional(),
  correlationId: z.string().optional(),
  capturedAt: z.string().optional()
}).refine((value) => Boolean(value.imagePath || value.imageBase64), {
  message: "imagePath or imageBase64 is required",
  path: ["imagePath"]
});

export const attendanceHistorySchema = z.object({
  status: z.enum(["VALID", "INVALID"]).or(z.literal("")).optional().transform(v => v === "" ? undefined : v),
  employeeId: z.string().optional().transform(v => v === "" ? undefined : v),
  studentId: z.string().optional().transform(v => v === "" ? undefined : v),
  limit: z.coerce.number().min(1).max(1000).optional().default(50),
  page: z.coerce.number().min(1).optional().default(1),
  date: z.string().optional().transform(v => v === "" ? undefined : v),
  month: z.string().optional().transform(v => v === "" ? undefined : v).refine(v => !v || /^\d{4}-\d{2}$/.test(v), "Invalid month format YYYY-MM"),
  view: z.enum(["log", "report"]).optional().default("report")
}).transform(data => ({
  ...data,
  employeeId: data.employeeId || data.studentId
}));


export const attendanceSessionsSchema = z.object({
  status: z.enum(["PENDING", "READY", "VERIFIED", "FAILED", "EXPIRED"]).or(z.literal("")).optional().transform(v => v === "" ? undefined : v),
  limit: z.coerce.number().min(1).max(1000).optional().default(50)
});

export type RfidEventDto = z.infer<typeof rfidEventSchema>;
export type FaceEventDto = z.infer<typeof faceEventSchema>;
export type AttendanceHistoryDto = z.infer<typeof attendanceHistorySchema>;
export type AttendanceSessionsDto = z.infer<typeof attendanceSessionsSchema>;

export interface AttendanceReportRecord {
  id: string;
  sessionId: string;
  employeeId?: string;
  employeeName?: string;
  rfidUid: string;
  status: "VALID" | "INVALID";
  punctuality?: "ON_TIME" | "LATE" | "EARLY_EXIT" | "BOLOS" | "OVERTIME";
  category?: "ENTRY" | "EXIT";
  confidence?: number;
  reason?: string;
  imagePath?: string;
  rfidDeviceCode?: string;
  faceDeviceCode?: string;
  verifiedAt: Date;
  createdAt: Date;
}
