import fs from "node:fs/promises";
import path from "node:path";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  attendanceHistorySchema,
  attendanceSessionsSchema,
  faceEventSchema,
  rfidEventSchema
} from "../dto/attendance.dto";
import { grpcClients, promisifyGrpc } from "../../../shared/grpc/grpc-client";
import { persistBase64Image, readFileAsBase64, upload } from "../../../shared/utils/file-storage";
import { PdfGenerator } from "../../../shared/utils/pdf-generator";
import { realtimeEvents } from "../../../shared/realtime/realtime-events";
import { FaceRecognitionClient } from "../../../shared/clients/face-recognition.client";
import { resolveCorrelationId } from "../../../shared/utils/correlation";
import { env } from "../../../config/env";

export class AttendanceController {
  constructor(private readonly faceRecognitionClient?: FaceRecognitionClient) {}
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
          action: "REGISTER_CAPTURE",
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
      } else if (verificationStatus === "NO_FACE") {
        res.status(StatusCodes.OK).json({ ...response, status: "NO_FACE", message: "No face detected" });
      } else if (verificationStatus === "INVALID") {
        res.status(StatusCodes.BAD_REQUEST).json({ ...response, status: "INVALID" });
      } else {
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
        const expectedLength = parseInt(req.headers["content-length"] ?? "0", 10);
        let receivedBytes = 0;
        const buffer = await new Promise<Buffer>((resolve, reject) => {
          const chunks: Buffer[] = [];
          req.on("data", (chunk) => {
            chunks.push(chunk);
            receivedBytes += chunk.length;
          });
          req.on("end", () => resolve(Buffer.concat(chunks)));
          req.on("error", (err) => {
            console.error("[GATEWAY] Stream Error:", err);
            reject(err);
          });
          req.setTimeout(30000, () => reject(new Error("Upload timeout")));
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

      // --- FACE DETECTION: detect + crop + green box, overwrite image ---
      let hasFace = true;
      if (imagePath && this.faceRecognitionClient) {
        try {
          const imageBase64 = await readFileAsBase64(imagePath);
          const detectResult = await this.faceRecognitionClient.detectFace({ imageBase64 });
          if (detectResult.hasFace && detectResult.displayImageBase64) {
            const absolutePath = path.resolve(process.cwd(), imagePath);
            const buffer = Buffer.from(detectResult.displayImageBase64, "base64");
            await fs.writeFile(absolutePath, buffer);
            console.log("[GATEWAY] Face detected, image updated with green bounding box");
          } else {
            console.log("[GATEWAY] No face detected in image");
            hasFace = false;
          }
        } catch (detectErr) {
          console.warn("[GATEWAY] Face detection error (non-fatal):", detectErr);
        }
      }

      // Normalisasi UID - Gunakan optional chaining (?.) untuk menghindari crash
      const rawUid = (req.body?.uid || req.headers["x-uid"] || "") as string;
      const normalizedUid = rawUid.replace(/\s+/g, "").toUpperCase();
      console.log("[GATEWAY] Normalized UID:", normalizedUid);

      if (req.headers["x-purpose"] === "registration") {
        console.log("[GATEWAY] Registration face received for UID:", normalizedUid);
        if (imagePath) {
          const path = require("node:path");
          const fileName = path.basename(imagePath);
          realtimeEvents.publish({
            channel: "employee",
            type: "registration.image.captured",
            payload: { uid: normalizedUid, imageUrl: `/uploads/${fileName}` }
          });
        }
        res.status(StatusCodes.OK).json({ success: true, message: "Registration image received" });
        return;
      }

      // Early rejection: no face detected → unblock RFID handler + return immediately
      if (!hasFace) {
        const noFaceCorrelationId = resolveCorrelationId({
          pairingKey: (req.body?.pairingKey || req.headers["x-pairing-key"] || "") as string,
          deviceCode: (req.body?.deviceCode || req.headers["x-device-code"] || "UNKNOWN") as string,
          capturedAt: req.body?.capturedAt,
          windowSeconds: env.ATTENDANCE_MATCH_WINDOW_SECONDS
        });
        realtimeEvents.publish({
          channel: "attendance",
          type: "attendance.verification.completed",
          payload: {
            sessionId: "",
            correlationId: noFaceCorrelationId,
            status: "NO_FACE"
          }
        });
        console.log("[GATEWAY] Early rejection: no face detected, verification completed event published");
        res.status(StatusCodes.OK).json({ status: "NO_FACE", message: "No face detected in image" });
        return;
      }

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
          capturedAt: ""
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

  async deleteSession(req: Request, res: Response): Promise<void> {
    try {
      const response = await promisifyGrpc<{ success: boolean; message: string }>(
        grpcClients.attendance,
        "DeleteAttendanceSession",
        { id: req.params.id }
      );
      res.status(StatusCodes.OK).json(response);
    } catch (error: any) {
      res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error"
      });
    }
  }

  async exportPdf(req: Request, res: Response): Promise<void> {
    const payload = attendanceHistorySchema.parse(req.query);
    const response = await promisifyGrpc<{ records: Array<any> }>(
      grpcClients.attendance,
      "GetAttendanceHistory",
      { ...payload, limit: 5000 } // Use the payload status filter, default no strict VALID so we can see BOLOS
    );

    let fetchedEmployeeName = "";
    let fetchedRfidUid = "-";
    if (payload.employeeId) {
      try {
        const empResponse = await promisifyGrpc<{ employee: any }>(
          grpcClients.employee,
          "GetEmployee",
          { id: payload.employeeId }
        );
        if (empResponse && empResponse.employee) {
          fetchedEmployeeName = empResponse.employee.fullName;
          fetchedRfidUid = empResponse.employee.rfidUid || "-";
        }
      } catch (err) {
        console.warn("[GATEWAY] Failed to fetch employee for PDF export:", err);
      }
    }

    const records = response.records || [];
    const reportData = records.map((record) => ({
      rfidUid: record.rfidUid && record.rfidUid !== "-" ? record.rfidUid : fetchedRfidUid,
      employeeName: record.employeeName || fetchedEmployeeName || "Unknown",
      verifiedAt: record.verifiedAt,
      status: record.status,
      category: record.category,
      punctuality: record.punctuality,
      entryTime: record.entryTime,
      exitTime: record.exitTime
    }));

    const buffer = await PdfGenerator.generateAttendanceReport(reportData, {
      month: payload.month,
      employeeName: reportData.length > 0 ? reportData[0].employeeName : (fetchedEmployeeName || "Karyawan")
    });

    res.setHeader("Content-Type", "application/pdf");
    res.send(buffer);
  }
}
