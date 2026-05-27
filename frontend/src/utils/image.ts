import { apiBaseUrl } from "./api-base";

export const resolveCaptureUrl = (value?: string): string | null => {
  if (!value) {
    return null;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const normalized = value.replace(/\\/g, "/");
  const filename = normalized.split("/").pop();

  return filename ? `${apiBaseUrl}/uploads/${filename}` : null;
};
