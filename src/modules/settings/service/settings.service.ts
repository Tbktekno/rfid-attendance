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
      early_exit_tolerance: result.early_exit_tolerance || "15",
      overtime_threshold: result.overtime_threshold || "60",
      working_days: result.working_days || "1,2,3,4,5",
      holidays: result.holidays || "[]",
    };
  }

  async updateSettings(dto: UpdateSettingsDto): Promise<void> {
    const updates: Array<{ key: string; value: string }> = [];
    
    if (dto.entry_time !== undefined) {
      updates.push({ key: "entry_time", value: dto.entry_time });
    }
    if (dto.exit_time !== undefined) {
      updates.push({ key: "exit_time", value: dto.exit_time });
    }
    if (dto.early_exit_tolerance !== undefined) {
      updates.push({ key: "early_exit_tolerance", value: dto.early_exit_tolerance });
    }
    if (dto.overtime_threshold !== undefined) {
      updates.push({ key: "overtime_threshold", value: dto.overtime_threshold });
    }
    if (dto.working_days !== undefined) {
      updates.push({ key: "working_days", value: dto.working_days });
    }
    if (dto.holidays !== undefined) {
      updates.push({ key: "holidays", value: dto.holidays });
    }

    for (const { key, value } of updates) {
      await this.settingsRepository.update(key, value);
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
