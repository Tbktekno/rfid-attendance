import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { deviceHeartbeatSchema, registerDeviceSchema } from "../dto/device.dto";
import { grpcClients, promisifyGrpc } from "../../../shared/grpc/grpc-client";

export class DeviceController {
  async register(req: Request, res: Response): Promise<void> {
    const payload = registerDeviceSchema.parse(req.body);
    const response = await promisifyGrpc<{ device: Record<string, unknown> }>(
      grpcClients.device,
      "RegisterDevice",
      {
        ...payload,
        metadataJson: JSON.stringify(payload.metadata ?? {})
      }
    );

    res.status(StatusCodes.CREATED).json(response);
  }

  async heartbeat(req: Request, res: Response): Promise<void> {
    const payload = deviceHeartbeatSchema.parse(req.body);
    const response = await promisifyGrpc<{ device: Record<string, unknown> }>(
      grpcClients.device,
      "Heartbeat",
      {
        ...payload,
        metadataJson: JSON.stringify(payload.metadata ?? {})
      }
    );

    res.status(StatusCodes.OK).json(response);
  }

  async list(req: Request, res: Response): Promise<void> {
    const response = await promisifyGrpc<{ devices: Array<Record<string, unknown>> }>(
      grpcClients.device,
      "ListDevices",
      {}
    );

    res.status(StatusCodes.OK).json(response);
  }
}
