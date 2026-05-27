import * as grpc from "@grpc/grpc-js";
import { env } from "../config/env";
import { connectSqlite } from "../shared/database/sqlite";
import { ensureUploadDir } from "../shared/utils/file-storage";
import { logger } from "../shared/logger";
import { platformProto } from "../shared/grpc/proto";
import { authHandlers } from "./handlers/auth.handler";
import { employeeHandlers } from "./handlers/employee.handler";
import { deviceHandlers } from "./handlers/device.handler";
import { attendanceHandlers } from "./handlers/attendance.handler";
import { settingsHandlers } from "./handlers/settings.handler";
import { attendanceRetryScheduler } from "../shared/container";

const start = async () => {
  await connectSqlite();
  await ensureUploadDir();
  await attendanceRetryScheduler.resumePendingSessions();

  const server = new grpc.Server();
  server.addService(platformProto.AuthService.service, authHandlers);
  server.addService(platformProto.EmployeeService.service, employeeHandlers);
  server.addService(platformProto.DeviceService.service, deviceHandlers);
  server.addService(platformProto.AttendanceService.service, attendanceHandlers);
  server.addService(platformProto.SettingsService.service, settingsHandlers);

  await new Promise<void>((resolve, reject) => {
    server.bindAsync(
      `0.0.0.0:${env.GRPC_PORT}`,
      grpc.ServerCredentials.createInsecure(),
      (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      }
    );
  });

  server.start();
  logger.info(`gRPC server listening on port ${env.GRPC_PORT}`);
};

start().catch((error) => {
  logger.error(error, "Failed to start gRPC server");
  process.exit(1);
});
