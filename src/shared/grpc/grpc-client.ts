import * as grpc from "@grpc/grpc-js";
import { StatusCodes } from "http-status-codes";
import { env } from "../../config/env";
import { AppError } from "../errors/app-error";
import { platformProto } from "./proto";

const address = `127.0.0.1:${env.GRPC_PORT}`;

export const grpcClients = {
  auth: new platformProto.AuthService(address, grpc.credentials.createInsecure()),
  employee: new platformProto.EmployeeService(address, grpc.credentials.createInsecure()),
  device: new platformProto.DeviceService(address, grpc.credentials.createInsecure()),
  attendance: new platformProto.AttendanceService(address, grpc.credentials.createInsecure()),
  settings: new platformProto.SettingsService(address, grpc.credentials.createInsecure())
};

export const promisifyGrpc = <TResponse>(client: any, method: string, payload: unknown): Promise<TResponse> =>
  new Promise((resolve, reject) => {
    client[method](payload, (error: (Error & { code?: number }) | null, response: TResponse) => {
      if (error) {
        const statusCode =
          error.code === grpc.status.INVALID_ARGUMENT
            ? StatusCodes.BAD_REQUEST
            : error.code === grpc.status.NOT_FOUND
              ? StatusCodes.NOT_FOUND
              : error.code === grpc.status.UNAUTHENTICATED
                ? StatusCodes.UNAUTHORIZED
                : StatusCodes.INTERNAL_SERVER_ERROR;

        reject(new AppError(statusCode, error.message, "GRPC_ERROR"));
        return;
      }

      resolve(response);
    });
  });
