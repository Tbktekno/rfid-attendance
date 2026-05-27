import { DeviceHeartbeatDto, RegisterDeviceDto } from "../dto/device.dto";
import { DeviceRepository } from "../repository/device.repository";
import { realtimeEvents } from "../../../shared/realtime/realtime-events";

export class DeviceService {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async register(input: RegisterDeviceDto) {
    const device = await this.deviceRepository.upsert({
      ...input
    });
    realtimeEvents.publish({
      channel: "device",
      type: "device.updated",
      payload: {
        deviceCode: device.deviceCode
      }
    });
    return device;
  }

  async heartbeat(input: DeviceHeartbeatDto) {
    const device = await this.deviceRepository.markSeen(input);
    realtimeEvents.publish({
      channel: "device",
      type: "device.updated",
      payload: {
        deviceCode: device.deviceCode
      }
    });
    return device;
  }

  async touchFromAttendance(input: {
    deviceCode: string;
    type: "ESP8266" | "ESP32CAM";
    metadata?: Record<string, unknown>;
  }) {
    const device = await this.deviceRepository.markSeen(input);
    realtimeEvents.publish({
      channel: "device",
      type: "device.updated",
      payload: {
        deviceCode: device.deviceCode
      }
    });
    return device;
  }

  async list() {
    const now = Date.now();
    const devices = await this.deviceRepository.list();
    return devices.map((device) => ({
      ...device,
      isOnline: device.lastSeenAt ? now - new Date(device.lastSeenAt).getTime() < 120000 : false
    }));
  }
}
