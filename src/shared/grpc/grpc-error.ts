import * as grpc from "@grpc/grpc-js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/app-error";
import { logger } from "../logger";

export const toGrpcError = (error: unknown): grpc.ServiceError => {
  const metadata = new grpc.Metadata();

  if (error instanceof AppError) {
    const code =
      error.statusCode === StatusCodes.BAD_REQUEST
        ? grpc.status.INVALID_ARGUMENT
        : error.statusCode === StatusCodes.NOT_FOUND
          ? grpc.status.NOT_FOUND
          : error.statusCode === StatusCodes.UNAUTHORIZED
            ? grpc.status.UNAUTHENTICATED
            : grpc.status.INTERNAL;

    return {
      name: error.name,
      message: error.message,
      code,
      details: error.message,
      metadata
    };
  }

  logger.error({ error }, "gRPC Handler Error");

  return {
    name: "InternalError",
    message: error instanceof Error ? error.message : "Internal gRPC error",
    code: grpc.status.INTERNAL,
    details: error instanceof Error ? (error.stack || error.message) : "Internal gRPC error",
    metadata
  };
};
