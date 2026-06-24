import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthenticatedRequest } from "./authenticate";

export const authorize = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden: You do not have permission to perform this action" });
      return;
    }
    next();
  };
};
