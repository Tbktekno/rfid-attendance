export interface DeviceEntity {
  id: string;
  deviceCode: string;
  type: "ESP8266" | "ESP32CAM" | "GATEWAY";
  name?: string;
  location?: string;
  status: "ONLINE" | "OFFLINE" | "ERROR";
  metadata?: Record<string, unknown>;
  lastSeenAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeviceRow {
  id: string;
  device_code: string;
  type: "ESP8266" | "ESP32CAM" | "GATEWAY";
  name: string | null;
  location: string | null;
  status: "ONLINE" | "OFFLINE" | "ERROR";
  metadata: string | null;
  last_seen_at: string | null;
  created_at: string;
  updated_at: string;
}

export const mapDeviceEntity = (row: DeviceRow): DeviceEntity => ({
  id: row.id,
  deviceCode: row.device_code,
  type: row.type,
  name: row.name ?? undefined,
  location: row.location ?? undefined,
  status: row.status,
  metadata: row.metadata ? (JSON.parse(row.metadata) as Record<string, unknown>) : undefined,
  lastSeenAt: row.last_seen_at ? new Date(row.last_seen_at) : undefined,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at)
});
