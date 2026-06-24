import { http } from "./http";

export interface SystemSettings {
  entry_time: string;
  exit_time: string;
}

export const settingsService = {
  getSettings: async (): Promise<SystemSettings> => {
    const response = await http.get("/api/v1/settings");
    return response.data;
  },

  updateSettings: async (settings: SystemSettings): Promise<void> => {
    await http.post("/api/v1/settings", settings);
  },

  resetSystem: async (): Promise<void> => {
    await http.delete("/api/v1/settings/reset");
  },
};
