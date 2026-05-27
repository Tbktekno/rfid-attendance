import { v4 as uuid } from "uuid";
import { sqlite } from "../../../shared/database/sqlite";
import { DeviceEntity, DeviceRow } from "../entity/device.model";
import { mapDeviceEntity } from "../entity/device.model";

export class DeviceRepository {
  async upsert(
    input: Partial<DeviceEntity> & { deviceCode: string; type: DeviceEntity["type"] }
  ): Promise<DeviceEntity> {
    const existing = sqlite.get<DeviceRow>(
      `SELECT id, device_code, type, name, location, status, metadata, last_seen_at, created_at, updated_at
       FROM devices
       WHERE device_code = ?`,
      [input.deviceCode]
    );

    const now = new Date().toISOString();

    if (existing) {
      await sqlite.run(
        `UPDATE devices
         SET type = ?, name = ?, location = ?, status = ?, metadata = ?, last_seen_at = ?, updated_at = ?
         WHERE device_code = ?`,
        [
          input.type,
          input.name ?? existing.name,
          input.location ?? existing.location,
          "ONLINE",
          JSON.stringify(input.metadata ?? (existing.metadata ? JSON.parse(existing.metadata) : {})),
          now,
          now,
          input.deviceCode
        ]
      );

      const row = sqlite.get<DeviceRow>(
        `SELECT id, device_code, type, name, location, status, metadata, last_seen_at, created_at, updated_at
         FROM devices
         WHERE device_code = ?`,
        [input.deviceCode]
      );

      return mapDeviceEntity(row as DeviceRow);
    }

    const id = uuid();
    await sqlite.run(
      `INSERT INTO devices (id, device_code, type, name, location, status, metadata, last_seen_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        input.deviceCode,
        input.type,
        input.name ?? null,
        input.location ?? null,
        "ONLINE",
        JSON.stringify(input.metadata ?? {}),
        now,
        now,
        now
      ]
    );

    return {
      id,
      deviceCode: input.deviceCode,
      type: input.type,
      name: input.name,
      location: input.location,
      status: "ONLINE",
      metadata: input.metadata,
      lastSeenAt: new Date(now),
      createdAt: new Date(now),
      updatedAt: new Date(now)
    };
  }

  async markSeen(input: { deviceCode: string; type: DeviceEntity["type"]; metadata?: Record<string, unknown> }): Promise<DeviceEntity> {
    return this.upsert({
      deviceCode: input.deviceCode,
      type: input.type,
      metadata: input.metadata
    });
  }

  async list(): Promise<DeviceEntity[]> {
    const rows = sqlite.all<DeviceRow>(
      `SELECT id, device_code, type, name, location, status, metadata, last_seen_at, created_at, updated_at
       FROM devices
       ORDER BY updated_at DESC`
    );

    return rows.map(mapDeviceEntity);
  }
}
