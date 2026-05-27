import { sqlite } from "../../../shared/database/sqlite";

export interface SettingRow {
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export class SettingsRepository {
  async getAll(): Promise<SettingRow[]> {
    return sqlite.all<SettingRow>(`SELECT * FROM system_settings`);
  }

  async getByKey(key: string): Promise<SettingRow | null> {
    return sqlite.get<SettingRow>(`SELECT * FROM system_settings WHERE key = ?`, [key]);
  }

  async update(key: string, value: string): Promise<void> {
    const now = new Date().toISOString();
    await sqlite.run(
      `UPDATE system_settings SET value = ?, updated_at = ? WHERE key = ?`,
      [value, now, key]
    );
  }
}
