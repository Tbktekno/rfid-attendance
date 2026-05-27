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
}
