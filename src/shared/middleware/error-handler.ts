import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { logger } from "../logger";
import { AppError } from "../errors/app-error";

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Validation failed",
      errors: error.flatten()
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      code: error.code
    });
    return;
  }

  if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Duplicate value violates unique constraint",
      detail: error.message
    });
    return;
  }

  logger.error({ error }, "Unhandled request error");
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error"
  });
};
