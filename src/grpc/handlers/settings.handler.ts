import * as grpc from "@grpc/grpc-js";
import { settingsService } from "../../shared/container";

export const settingsHandlers = {
  GetSettings: async (
    call: grpc.ServerUnaryCall<unknown, any>,
    callback: grpc.sendUnaryData<any>
  ) => {
    try {
      const response = await settingsService.getSettings();
      // Map to expected camelCase for gRPC response
      callback(null, {
        entryTime: response.entry_time,
        exitTime: response.exit_time
      });
    } catch (error: any) {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message
      });
    }
  },

  UpdateSettings: async (
    call: grpc.ServerUnaryCall<{ entryTime: string; exitTime: string }, any>,
    callback: grpc.sendUnaryData<any>
  ) => {
    try {
      await settingsService.updateSettings({
        entry_time: call.request.entryTime,
        exit_time: call.request.exitTime
      });
      callback(null, { success: true, message: "Settings updated successfully" });
    } catch (error: any) {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message
      });
    }
  },

  ResetSystem: async (
    call: grpc.ServerUnaryCall<unknown, any>,
    callback: grpc.sendUnaryData<any>
  ) => {
    try {
      await settingsService.resetSystem();
      callback(null, { success: true, message: "System reset successfully" });
    } catch (error: any) {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message
      });
    }
  }
};
