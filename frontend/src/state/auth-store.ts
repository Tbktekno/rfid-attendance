import { create } from "zustand";
import { authService } from "../services/auth.service";
import type { AuthUser } from "../types/domain";

interface AuthState {
  token: string;
  user: AuthUser | null;
  isLoading: boolean;
  isHydrated: boolean;
  error: string;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

const storageKey = "rfid-v3-auth";

export const useAuthStore = create<AuthState>((set) => ({
  token: "",
  user: null,
  isLoading: false,
  isHydrated: false,
  error: "",
  async login(payload) {
    set({ isLoading: true, error: "" });

    try {
      const response = await authService.login(payload);
      const expiresAt = Date.now() + 60 * 60 * 1000; // 1 jam (1 hour)
      localStorage.setItem(storageKey, JSON.stringify({ ...response, expiresAt }));
      set({
        token: response.token,
        user: response.user,
        isLoading: false
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Login gagal"
      });
    }
  },
  logout() {
    localStorage.removeItem(storageKey);
    set({ token: "", user: null, error: "" });
  },
  hydrate() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      set({ isHydrated: true });
      return;
    }

    try {
      const parsed = JSON.parse(raw) as { token: string; user: AuthUser; expiresAt?: number };
      
      if (!parsed.expiresAt || Date.now() > parsed.expiresAt) {
        localStorage.removeItem(storageKey);
        set({ isHydrated: true });
        return;
      }

      set({ token: parsed.token, user: parsed.user, isHydrated: true });
    } catch {
      localStorage.removeItem(storageKey);
      set({ isHydrated: true });
    }
  }
}));
