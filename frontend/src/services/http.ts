import axios from "axios";
import { apiBaseUrl } from "../utils/api-base";
import { useAuthStore } from "../state/auth-store";

export const http = axios.create({
  baseURL: apiBaseUrl
});

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
