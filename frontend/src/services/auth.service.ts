import { http } from "./http";
import type { AuthUser } from "../types/domain";

export const authService = {
  async login(payload: { email: string; password: string }): Promise<{ token: string; user: AuthUser }> {
    const { data } = await http.post("/api/v1/auth/login", payload);
    return data;
  }
};
