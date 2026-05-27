import { z } from "zod";

export const registerDeviceSchema = z.object({
  deviceCode: z.string().min(2),
  type: z.enum(["ESP8266", "ESP32CAM", "GATEWAY"]),
  name: z.string().optional(),
  location: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

export const deviceHeartbeatSchema = z.object({
  deviceCode: z.string().min(2),
  type: z.enum(["ESP8266", "ESP32CAM", "GATEWAY"]),
  metadata: z.record(z.any()).optional()
});

export type RegisterDeviceDto = z.infer<typeof registerDeviceSchema>;
export type DeviceHeartbeatDto = z.infer<typeof deviceHeartbeatSchema>;
