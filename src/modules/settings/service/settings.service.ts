import { SettingsRepository } from "../repository/settings.repository";
import { UpdateSettingsDto, SystemSettingsResponse } from "../dto/settings.dto";

export class SettingsService {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async getSettings(): Promise<SystemSettingsResponse> {
    const settings = await this.settingsRepository.getAll();
    const result: any = {};
    
    settings.forEach(s => {
      result[s.key] = s.value;
    });

    return {
      entry_time: result.entry_time || "07:30",
      exit_time: result.exit_time || "14:00",
    };
  }

  async updateSettings(dto: UpdateSettingsDto): Promise<void> {
    if (dto.entry_time) {
      await this.settingsRepository.update("entry_time", dto.entry_time);
    }
    if (dto.exit_time) {
      await this.settingsRepository.update("exit_time", dto.exit_time);
    }
  }

  async resetSystem(): Promise<void> {
    const { sqlite } = await import("../../../shared/database/sqlite");
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    
    // DB cleanup
    await sqlite.exec(`
      DELETE FROM attendance_records;
      DELETE FROM attendance_sessions;
      DELETE FROM employees;
      DELETE FROM devices;
      DELETE FROM users WHERE role != 'ADMIN';
    `);

    // File cleanup
    const facesDir = path.join(process.cwd(), 'storage/uploads/faces');
    const attendanceDir = path.join(process.cwd(), 'storage/uploads/attendance');
    
    await fs.rm(facesDir, { recursive: true, force: true });
    await fs.rm(attendanceDir, { recursive: true, force: true });
    
    await fs.mkdir(facesDir, { recursive: true });
    await fs.mkdir(attendanceDir, { recursive: true });
  }
}
