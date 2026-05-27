import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { env } from "../../config/env";

export interface AuthenticatedRequest extends Request {
  user?: {
    sub: string;
    email: string;
    role: string;
  };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, env.JWT_SECRET) as AuthenticatedRequest["user"];
    next();
  } catch {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
  }
};
