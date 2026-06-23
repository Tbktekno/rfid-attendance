import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  attendanceHistorySchema,
  attendanceSessionsSchema,
  faceEventSchema,
  rfidEventSchema
} from "../dto/attendance.dto";
import { grpcClients, promisifyGrpc } from "../../../shared/grpc/grpc-client";
import { persistBase64Image, upload } from "../../../shared/utils/file-storage";
import { PdfGenerator } from "../../../shared/utils/pdf-generator";
import { realtimeEvents } from "../../../shared/realtime/realtime-events";

export class AttendanceController {
  async checkRfid(req: Request, res: Response): Promise<void> {
    try {
      const payload = rfidEventSchema.parse(req.body);
      
      // Call gRPC layer to check RFID
      const response = await promisifyGrpc<{ registered: boolean; employeeId: string; employeeName: string }>(
        grpcClients.attendance,
        "CheckRfid",
        { uid: payload.uid }
      );

      if (!response.registered) {
        res.status(StatusCodes.OK).json({
          success: false,
          registered: false,
          message: "RFID_NOT_REGISTERED"
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        success: true,
        registered: true,
        employeeId: response.employeeId,
        employeeName: response.employeeName
      });
    } catch (error: any) {
      console.error("[GATEWAY] FATAL ERROR in checkRfid:", error);
      res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error"
      });
    }
  }
  async processRfid(req: Request, res: Response): Promise<void> {
    try {
      const payload = rfidEventSchema.parse(req.body);
      const response = await promisifyGrpc<{ message: string; correlationId: string }>(
        grpcClients.attendance,
        "ProcessRfidEvent",
        payload
      );

      console.log("[GATEWAY] gRPC RFID Enqueued:", response.correlationId);

      // --- WAIT FOR VERIFICATION RESULT ---
      const verificationStatus = await new Promise<string | undefined>((resolve) => {
        const timeout = setTimeout(() => {
          unsubscribe();
          resolve(undefined); // Timeout
        }, 20000); // Wait up to 20 seconds for verification

        const unsubscribe = realtimeEvents.subscribe((event) => {
          if (event.channel === "attendance" && event.payload.correlationId === response.correlationId) {
            if (event.type === "attendance.verification.completed") {
              clearTimeout(timeout);
              unsubscribe();
              resolve(event.payload.status);
            } else if (event.type === "attendance.verification.failed") {
              clearTimeout(timeout);
              unsubscribe();
              resolve("INVALID");
            }
          }
        });
      });

      if (verificationStatus === "VALID") {
        res.status(StatusCodes.OK).json({ ...response, status: "VALID" });
      } else if (verificationStatus === "INVALID") {
        res.status(StatusCodes.BAD_REQUEST).json({ ...response, status: "INVALID" });
      } else {
        // Fallback jika timeout
        res.status(StatusCodes.REQUEST_TIMEOUT).json({ ...response, status: "TIMEOUT" });
      }
    } catch (error: any) {
      console.error("[GATEWAY] FATAL ERROR:", error);
      res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
        stack: error.stack
      });
    }
  }

  async processFace(req: Request, res: Response): Promise<void> {
    console.log("[GATEWAY] Processing Face Event from:", req.headers["x-device-code"]);
    let imagePath: string | undefined;

    try {
      // 1. Handle Binary Upload (application/octet-stream) - ESP32-CAM
      if (req.headers["content-type"] === "application/octet-stream") {
        console.log("[GATEWAY] Reading Binary Stream...");
        const buffer = await new Promise<Buffer>((resolve, reject) => {
          const chunks: Buffer[] = [];
          req.on("data", (chunk) => chunks.push(chunk));
          req.on("end", () => resolve(Buffer.concat(chunks)));
          req.on("error", (err) => {
            console.error("[GATEWAY] Stream Error:", err);
            reject(err);
          });
          req.setTimeout(8000, () => reject(new Error("Upload timeout")));
        });
        console.log("[GATEWAY] Binary Read Success, size:", buffer.length);
        imagePath = await persistBase64Image(buffer.toString("base64"), "attendance-face");
      } 
      // 2. Handle Multipart Upload (Dashboard / Simulator)
      else if (req.headers["content-type"]?.includes("multipart/form-data")) {
        console.log("[GATEWAY] Handling Multipart...");
        await new Promise((resolve, reject) => {
          upload.single("image")(req, res, (err: any) => {
            if (err) return reject(err);
            resolve(null);
          });
        });
        imagePath =
          req.file?.path ??
          (req.body.imageBase64 ? await persistBase64Image(req.body.imageBase64, "attendance-face") : undefined);
      }
      // 3. Handle JSON / Other
      else {
        console.log("[GATEWAY] Handling JSON/Base64...");
        imagePath = req.body.imageBase64 ? await persistBase64Image(req.body.imageBase64, "attendance-face") : undefined;
      }

      console.log("[GATEWAY] Image Path:", imagePath);

      // Normalisasi UID - Gunakan optional chaining (?.) untuk menghindari crash
      const rawUid = (req.body?.uid || req.headers["x-uid"] || "") as string;
      const normalizedUid = rawUid.replace(/\s+/g, "").toUpperCase();
      console.log("[GATEWAY] Normalized UID:", normalizedUid);

      const payload = faceEventSchema.parse({
        uid: normalizedUid || undefined,
        deviceCode: (req.body?.deviceCode || req.headers["x-device-code"] || "UNKNOWN") as string,
        pairingKey: (req.body?.pairingKey || req.headers["x-pairing-key"] || "") as string,
        imagePath
      });

      console.log("[GATEWAY] Calling gRPC ProcessFaceEvent...");
      const response = await promisifyGrpc<{ message: string; correlationId: string }>(
        grpcClients.attendance,
        "ProcessFaceEvent",
        {
          uid: payload.uid ?? "",
          deviceCode: payload.deviceCode,
          pairingKey: payload.pairingKey ?? "",
          imagePath: payload.imagePath ?? "",
          imageBase64: "",
          correlationId: payload.correlationId ?? "",
          capturedAt: payload.capturedAt ?? new Date().toISOString()
        }
      );

      console.log("[GATEWAY] gRPC Enqueued:", response.correlationId);

      // --- WAIT FOR VERIFICATION RESULT ---
      const verificationStatus = await new Promise<string | undefined>((resolve) => {
        const timeout = setTimeout(() => {
          unsubscribe();
          resolve(undefined); // Timeout
        }, 15000); // Wait up to 15 seconds for verification

        const unsubscribe = realtimeEvents.subscribe((event) => {
          if (event.channel === "attendance" && event.payload.correlationId === response.correlationId) {
            if (event.type === "attendance.verification.completed") {
              clearTimeout(timeout);
              unsubscribe();
              resolve(event.payload.status);
            } else if (event.type === "attendance.verification.failed") {
              clearTimeout(timeout);
              unsubscribe();
              resolve("INVALID");
            }
          }
        });
      });

      if (verificationStatus === "VALID") {
        res.status(StatusCodes.OK).json({ ...response, status: "VALID" });
      } else if (verificationStatus === "INVALID") {
        // Return 400 or 401? The ESP32-CAM checks for httpCode == 200.
        // If INVALID, returning 400 will make ESP32-CAM print FAILED.
        res.status(StatusCodes.BAD_REQUEST).json({ ...response, status: "INVALID" });
      } else {
        // Fallback if timeout
        res.status(StatusCodes.ACCEPTED).json(response);
      }
    } catch (error: any) {
      console.error("[GATEWAY] FATAL ERROR:", error);
      res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
        stack: error.stack
      });
    }
  }

  async history(req: Request, res: Response): Promise<void> {
    const payload = attendanceHistorySchema.parse(req.query);
    const response = await promisifyGrpc<{ records: Array<Record<string, unknown>> }>(
      grpcClients.attendance,
      "GetAttendanceHistory",
      payload
    );

    res.status(StatusCodes.OK).json(response);
  }

  async sessions(req: Request, res: Response): Promise<void> {
    const payload = attendanceSessionsSchema.parse(req.query);
    const response = await promisifyGrpc<{ sessions: Array<Record<string, unknown>> }>(
      grpcClients.attendance,
      "GetAttendanceSessions",
      payload
    );

    res.status(StatusCodes.OK).json(response);
  }

  async exportPdf(req: Request, res: Response): Promise<void> {
    const payload = attendanceHistorySchema.parse(req.query);
    const response = await promisifyGrpc<{ records: Array<any> }>(
      grpcClients.attendance,
      "GetAttendanceHistory",
      { ...payload, limit: 1000 } // Use the payload status filter, default no strict VALID so we can see BOLOS
    );

    const records = response.records || [];
    const reportData = records.map((record) => ({
      rfidUid: record.rfidUid,
      employeeName: record.employeeName,
      verifiedAt: record.verifiedAt,
      status: record.status,
      category: record.category,
      punctuality: record.punctuality
    }));

    const buffer = await PdfGenerator.generateAttendanceReport(reportData, {
      month: payload.month,
      employeeName: reportData[0]?.employeeName || "Karyawan"
    });

    res.setHeader("Content-Type", "application/pdf");
    res.send(buffer);
  }
}
