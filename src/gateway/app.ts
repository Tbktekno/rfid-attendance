import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import path from "node:path";
import { env } from "../config/env";
import { logger } from "../shared/logger";
import { errorHandler } from "../shared/middleware/error-handler";
import { asyncHandler } from "../shared/middleware/async-handler";
import { authenticate } from "../shared/middleware/authenticate";
import { upload } from "../shared/utils/file-storage";
import { AuthController } from "../modules/auth/controller/auth.controller";
import { EmployeeController } from "../modules/employee/controller/employee.controller";
import { DeviceController } from "../modules/device/controller/device.controller";
import { AttendanceController } from "../modules/attendance/controller/attendance.controller";
import { AttendanceStreamController } from "../modules/attendance/controller/attendance-stream.controller";
import { SettingsController } from "../modules/settings/controller/settings.controller";

const authController = new AuthController();
const employeeController = new EmployeeController();
const deviceController = new DeviceController();
const attendanceController = new AttendanceController();
const attendanceStreamController = new AttendanceStreamController();
const settingsController = new SettingsController();

export const createGatewayApp = () => {
  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" }
    })
  );
  app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With", "x-device-code", "x-uid", "x-pairing-key"],
    exposedHeaders: ["Content-Disposition", "Content-Length", "Content-Type"]
  }));
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(pinoHttp({ logger }));
  app.use("/uploads", express.static(path.resolve(env.uploadDirAbsolute)));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/v1/auth/register", asyncHandler(authController.register.bind(authController)));
  app.post("/api/v1/auth/login", asyncHandler(authController.login.bind(authController)));

  app.post("/api/v1/devices/register", asyncHandler(deviceController.register.bind(deviceController)));
  app.post("/api/v1/devices/heartbeat", asyncHandler(deviceController.heartbeat.bind(deviceController)));
  app.get("/api/v1/devices", authenticate, asyncHandler(deviceController.list.bind(deviceController)));

  app.post("/api/v1/attendance/check-rfid", asyncHandler(attendanceController.checkRfid.bind(attendanceController)));
  app.post("/api/v1/attendance/rfid", asyncHandler(attendanceController.processRfid.bind(attendanceController)));
  app.post(
    "/api/v1/attendance/face",
    asyncHandler(attendanceController.processFace.bind(attendanceController))
  );
  app.get(
    "/api/v1/attendance/history",
    authenticate,
    asyncHandler(attendanceController.history.bind(attendanceController))
  );
  app.get(
    "/api/v1/attendance/sessions",
    authenticate,
    asyncHandler(attendanceController.sessions.bind(attendanceController))
  );
  app.get(
    "/api/v1/attendance/export/pdf",
    authenticate,
    asyncHandler(attendanceController.exportPdf.bind(attendanceController))
  );
  app.get(
    "/api/v1/attendance/stream",
    authenticate,
    attendanceStreamController.stream.bind(attendanceStreamController)
  );

  app.post(
    "/api/v1/employees",
    authenticate,
    upload.single("image"),
    asyncHandler(employeeController.create.bind(employeeController))
  );
  app.put(
    "/api/v1/employees/:id",
    authenticate,
    upload.single("image"),
    asyncHandler(employeeController.update.bind(employeeController))
  );
  app.get("/api/v1/employees/:id", authenticate, asyncHandler(employeeController.getById.bind(employeeController)));
  app.get("/api/v1/employees", authenticate, asyncHandler(employeeController.list.bind(employeeController)));
  app.delete("/api/v1/employees/:id", authenticate, asyncHandler(employeeController.delete.bind(employeeController)));

  // Backward compatibility for /students
  app.post("/api/v1/students", authenticate, upload.single("image"), asyncHandler(employeeController.create.bind(employeeController)));
  app.put("/api/v1/students/:id", authenticate, upload.single("image"), asyncHandler(employeeController.update.bind(employeeController)));
  app.get("/api/v1/students/:id", authenticate, asyncHandler(employeeController.getById.bind(employeeController)));
  app.get("/api/v1/students", authenticate, asyncHandler(employeeController.list.bind(employeeController)));
  app.delete("/api/v1/students/:id", authenticate, asyncHandler(employeeController.delete.bind(employeeController)));


  app.get("/api/v1/settings", authenticate, asyncHandler(settingsController.getSettings.bind(settingsController)));
  app.post("/api/v1/settings", authenticate, asyncHandler(settingsController.updateSettings.bind(settingsController)));

  app.use(errorHandler);

  return app;
};
