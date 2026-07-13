import * as grpc from "@grpc/grpc-js";
import { settingsService } from "../../shared/container";

export const settingsHandlers = {
  GetSettings: async (
    call: grpc.ServerUnaryCall<unknown, any>,
    callback: grpc.sendUnaryData<any>
  ) => {
    try {
      const response = await settingsService.getSettings();
      callback(null, {
        entryTime: response.entry_time,
        exitTime: response.exit_time,
        earlyExitTolerance: response.early_exit_tolerance,
        overtimeThreshold: response.overtime_threshold,
        workingDays: response.working_days,
        holidays: response.holidays
      });
    } catch (error: any) {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message
      });
    }
  },

  UpdateSettings: async (
    call: grpc.ServerUnaryCall<{ entryTime: string; exitTime: string; earlyExitTolerance: string; overtimeThreshold: string; workingDays: string; holidays: string }, any>,
    callback: grpc.sendUnaryData<any>
  ) => {
    try {
      await settingsService.updateSettings({
        entry_time: call.request.entryTime,
        exit_time: call.request.exitTime,
        early_exit_tolerance: call.request.earlyExitTolerance,
        overtime_threshold: call.request.overtimeThreshold,
        working_days: call.request.workingDays,
        holidays: call.request.holidays
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
