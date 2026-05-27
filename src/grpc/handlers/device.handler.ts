import { deviceHeartbeatSchema, registerDeviceSchema } from "../../modules/device/dto/device.dto";
import { deviceService } from "../../shared/container";
import { toGrpcError } from "../../shared/grpc/grpc-error";

const parseMetadata = (value?: string): Record<string, unknown> | undefined => {
  if (!value) {
    return undefined;
  }

  return JSON.parse(value);
};

const mapDevice = (device: any) => ({
  id: device.id,
  deviceCode: device.deviceCode,
  type: device.type,
  name: device.name ?? "",
  location: device.location ?? "",
  status: device.status,
  lastSeenAt: device.lastSeenAt ? new Date(device.lastSeenAt).toISOString() : "",
  metadataJson: JSON.stringify(device.metadata ?? {}),
  isOnline: Boolean(device.isOnline),
  createdAt: device.createdAt.toISOString(),
  updatedAt: device.updatedAt.toISOString()
});

export const deviceHandlers = {
  RegisterDevice: async (call: any, callback: any) => {
    try {
      const device = await deviceService.register(
        registerDeviceSchema.parse({
          ...call.request,
          metadata: parseMetadata(call.request.metadataJson)
        })
      );
      callback(null, { device: mapDevice({ ...device, isOnline: true }) });
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  Heartbeat: async (call: any, callback: any) => {
    try {
      const device = await deviceService.heartbeat(
        deviceHeartbeatSchema.parse({
          ...call.request,
          metadata: parseMetadata(call.request.metadataJson)
        })
      );
      callback(null, { device: mapDevice({ ...device, isOnline: true }) });
    } catch (error) {
      callback(toGrpcError(error));
    }
  },
  ListDevices: async (_call: any, callback: any) => {
    try {
      const devices = await deviceService.list();
      callback(null, { devices: devices.map(mapDevice) });
    } catch (error) {
      callback(toGrpcError(error));
    }
  }
};
