import {
  attendanceHistorySchema,
  attendanceSessionsSchema,
  faceEventSchema,
  rfidEventSchema
} from "../../modules/attendance/dto/attendance.dto";
import { attendanceService } from "../../shared/container";
import { toGrpcError } from "../../shared/grpc/grpc-error";
import { logger } from "../../shared/logger";
import { realtimeEvents } from "../../shared/realtime/realtime-events";
import { EmployeeRepository } from "../../modules/employee/repository/employee.repository";

const mapRecord = (record: any) => ({
  id: record.id,
  sessionId: record.sessionId,
  employeeId: record.employeeId ?? "",
  employeeName: record.employeeName ?? "",
  rfidUid: record.rfidUid,
  status: record.status,
  confidence: record.confidence ?? 0,
  reason: record.reason ?? "",
  imagePath: record.imagePath ?? "",
  rfidDeviceCode: record.rfidDeviceCode ?? "",
  faceDeviceCode: record.faceDeviceCode ?? "",
  verifiedAt: new Date(record.verifiedAt).toISOString(),
  createdAt: new Date(record.createdAt).toISOString(),
  punctuality: record.punctuality ?? "",
  category: record.category ?? "",
  entryTime: record.entryTime ?? "",
  exitTime: record.exitTime ?? ""
});

const mapSession = (session: any) => {
  try {
    return {
      id: session.id,
      correlationId: session.correlationId,
      pairingKey: session.pairingKey ?? "",
      rfidUid: session.rfidUid ?? "",
      rfidDeviceCode: session.rfidDeviceCode ?? "",
      faceDeviceCode: session.faceDeviceCode ?? "",
      faceImagePath: session.faceImagePath ?? "",
      verificationQueued: session.verificationQueued,
      verificationAttempts: session.verificationAttempts,
      status: session.status,
      reason: session.reason ?? "",
      startedAt: session.startedAt instanceof Date ? session.startedAt.toISOString() : new Date(session.startedAt).toISOString(),
      lastEventAt: session.lastEventAt instanceof Date ? session.lastEventAt.toISOString() : new Date(session.lastEventAt).toISOString(),
      verifiedAt: session.verifiedAt ? (session.verifiedAt instanceof Date ? session.verifiedAt.toISOString() : new Date(session.verifiedAt).toISOString()) : ""
    };
  } catch (error) {
    console.error("Failed to map session:", session.id, error);
    throw error;
  }
};

export const attendanceHandlers = {
  CheckRfid: async (call: any, callback: any) => {
    try {
      const { uid } = call.request;
      const employeeRepo = new EmployeeRepository();
      const employee = await employeeRepo.findByRfidUid(uid);

      if (!employee) {
        realtimeEvents.publish({
          channel: "device",
          type: "device.rfid.scanned",
          payload: { uid }
        } as any);

        callback(null, { registered: false, employeeId: "", employeeName: "" });
        return;
      }

      callback(null, { registered: true, employeeId: employee.id, employeeName: employee.fullName });
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  ProcessRfidEvent: async (call: any, callback: any) => {
    try {
      logger.info({ request: call.request }, "gRPC: ProcessRfidEvent");
      const response = await attendanceService.enqueueRfidEvent(rfidEventSchema.parse(call.request));
      callback(null, response);
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  ProcessFaceEvent: async (call: any, callback: any) => {
    try {
      logger.info({ request: { ...call.request, imageBase64: call.request.imageBase64 ? "[REDACTED]" : "" } }, "gRPC: ProcessFaceEvent");
      const rawUid = (call.request.uid || "") as string;
      const normalizedUid = rawUid.replace(/\s+/g, "").toUpperCase();

      const payload = faceEventSchema.parse({
        ...call.request,
        uid: normalizedUid || undefined
      });
      const response = await attendanceService.enqueueFaceEvent(payload);
      callback(null, response);
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  GetAttendanceHistory: async (call: any, callback: any) => {
    try {
      const payload = attendanceHistorySchema.parse(call.request);
      const { records, totalRecords } = await attendanceService.getHistory(payload);
      callback(null, { 
        records: records.map(mapRecord),
        totalRecords: totalRecords
      });
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  GetAttendanceSessions: async (call: any, callback: any) => {
    try {
      const payload = attendanceSessionsSchema.parse(call.request);
      const sessions = await attendanceService.getSessions(payload);
      callback(null, { sessions: (sessions || []).map(mapSession) });
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  DeleteAttendanceSession: async (call: any, callback: any) => {
    try {
      const { id } = call.request;
      await attendanceService.deleteSession(id);
      callback(null, { success: true, message: "Sesi berhasil dihapus" });
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  WatchEvents: (call: any) => {
    const listener = (event: any) => {
      call.write({
        channel: event.channel,
        type: event.type,
        payloadJson: JSON.stringify(event.payload || {})
      });
    };

    const unsubscribe = realtimeEvents.subscribe(listener);

    call.on("cancelled", () => {
      unsubscribe();
    });
  }
};
