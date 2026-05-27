import fs from "node:fs/promises";
import path from "node:path";
import multer from "multer";
import { randomUUID } from "node:crypto";
import { env } from "../../config/env";

export const ensureUploadDir = async (): Promise<void> => {
  await fs.mkdir(env.uploadDirAbsolute, { recursive: true });
};

const cleanBase64 = (value: string): string => value.replace(/^data:image\/[a-zA-Z+]+;base64,/, "");

export const persistBase64Image = async (value: string, prefix: string): Promise<string> => {
  await ensureUploadDir();
  const buffer = Buffer.from(cleanBase64(value), "base64");
  const filename = `${prefix}-${randomUUID()}.jpg`;
  const filePath = path.join(env.uploadDirAbsolute, filename);
  await fs.writeFile(filePath, buffer);
  return path.join(env.UPLOAD_DIR, filename);
};

export const readFileAsBase64 = async (filePath: string): Promise<string> => {
  const buffer = await fs.readFile(filePath);
  return buffer.toString("base64");
};

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, env.uploadDirAbsolute);
    },
    filename: (_req, file, cb) => {
      const extension = path.extname(file.originalname) || ".jpg";
      cb(null, `${Date.now()}-${randomUUID()}${extension}`);
    }
  }),
  limits: {
    fileSize: 8 * 1024 * 1024
  }
});
