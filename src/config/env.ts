import path from "node:path";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  GRPC_PORT: z.coerce.number().default(50051),
  JWT_SECRET: z.string().min(8),
  JWT_EXPIRES_IN: z.string().default("1h"),
  SQLITE_PATH: z.string().min(1),
  FACE_SERVICE_URL: z.string().url(),
  FACE_MATCH_THRESHOLD: z.coerce.number().default(0.30),
  ATTENDANCE_MATCH_WINDOW_SECONDS: z.coerce.number().default(120),
  UPLOAD_DIR: z.string().default("storage/uploads"),
  LOG_LEVEL: z.string().default("info")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment variables: ${parsed.error.message}`);
}

export const env = {
  ...parsed.data,
  uploadDirAbsolute: path.resolve(process.cwd(), parsed.data.UPLOAD_DIR),
  sqlitePathAbsolute: path.resolve(process.cwd(), parsed.data.SQLITE_PATH)
};
