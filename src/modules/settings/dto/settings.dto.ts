export interface UpdateSettingsDto {
  entry_time: string;
  exit_time: string;
  early_exit_tolerance?: string;
  overtime_threshold?: string;
}

export interface SystemSettingsResponse {
  entry_time: string;
  exit_time: string;
  early_exit_tolerance: string;
  overtime_threshold: string;
}
