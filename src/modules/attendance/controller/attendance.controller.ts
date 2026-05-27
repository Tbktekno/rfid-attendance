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

export class AttendanceController {
  async processRfid(req: Request, res: Response): Promise<void> {
    const payload = rfidEventSchema.parse(req.body);
    const response = await promisifyGrpc<{ message: string; correlationId: string }>(
      grpcClients.attendance,
      "ProcessRfidEvent",
      payload
    );

    res.status(StatusCodes.ACCEPTED).json(response);
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

      console.log("[GATEWAY] gRPC Success:", response.correlationId);
      res.status(StatusCodes.ACCEPTED).json(response);
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
    // Set higher limit for export or handle all data, and restrict status to strictly VALID
    const response = await promisifyGrpc<{ records: Array<any> }>(
      grpcClients.attendance,
      "GetAttendanceHistory",
      { ...payload, status: "VALID", limit: 1000 } // Default to 1000 records for export, only valid ones
    );

    const records = (response.records || []).filter((record) => record.status === "VALID");
    const reportData = records.map((record) => ({
      rfidUid: record.rfidUid,
      employeeName: record.employeeName,
      verifiedAt: record.verifiedAt,
      status: record.status,
      category: record.category,
      punctuality: record.punctuality
    }));

    const buffer = await PdfGenerator.generateAttendanceReport(reportData);

    res.setHeader("Content-Type", "application/pdf");
    res.send(buffer);
  }
}
