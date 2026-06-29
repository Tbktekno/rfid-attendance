import { Request, Response } from "express";
import { grpcClients, promisifyGrpc } from "../../../shared/grpc/grpc-client";
import { SystemSettingsResponse } from "../dto/settings.dto";

export class SettingsController {
  async getSettings(req: Request, res: Response) {
    try {
      const response = await promisifyGrpc<{ entryTime: string; exitTime: string; earlyExitTolerance: string; overtimeThreshold: string }>(
        grpcClients.settings,
        "GetSettings",
        {}
      );
      res.json({
        entry_time: response.entryTime,
        exit_time: response.exitTime,
        early_exit_tolerance: response.earlyExitTolerance,
        overtime_threshold: response.overtimeThreshold
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateSettings(req: Request, res: Response) {
    try {
      await promisifyGrpc<{ success: boolean; message: string }>(
        grpcClients.settings,
        "UpdateSettings",
        {
          entryTime: req.body.entry_time,
          exitTime: req.body.exit_time,
          earlyExitTolerance: req.body.early_exit_tolerance,
          overtimeThreshold: req.body.overtime_threshold
        }
      );
      res.json({ message: "Settings updated successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async resetSystem(req: Request, res: Response) {
    try {
      const response = await promisifyGrpc<{ success: boolean; message: string }>(
        grpcClients.settings,
        "ResetSystem",
        {}
      );
      res.json(response);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
