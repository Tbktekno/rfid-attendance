import { authService } from "../../shared/container";
import { toGrpcError } from "../../shared/grpc/grpc-error";

export const authHandlers = {
  Register: async (call: any, callback: any) => {
    try {
      const response = await authService.register(call.request);
      callback(null, response);
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  Login: async (call: any, callback: any) => {
    try {
      const response = await authService.login(call.request);
      callback(null, response);
    } catch (error) {
      callback(toGrpcError(error));
    }
  }
};
