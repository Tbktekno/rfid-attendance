import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { loginSchema, registerSchema } from "../dto/auth.dto";
import { grpcClients, promisifyGrpc } from "../../../shared/grpc/grpc-client";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    const payload = registerSchema.parse(req.body);
    const response = await promisifyGrpc<{ token: string; user: Record<string, unknown> }>(
      grpcClients.auth,
      "Register",
      payload
    );

    res.status(StatusCodes.CREATED).json(response);
  }

  async login(req: Request, res: Response): Promise<void> {
    const payload = loginSchema.parse(req.body);
    const response = await promisifyGrpc<{ token: string; user: Record<string, unknown> }>(
      grpcClients.auth,
      "Login",
      payload
    );

    res.status(StatusCodes.OK).json(response);
  }
}
