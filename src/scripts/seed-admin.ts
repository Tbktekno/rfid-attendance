import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { sqlite, connectSqlite } from "../shared/database/sqlite";
import { logger } from "../shared/logger";

async function main() {
  await connectSqlite();

  const adminEmail = "admin@rfid.com";
  const adminPassword = "password123";
  const adminName = "System Admin";

  const existing = sqlite.get("SELECT id FROM users WHERE email = ?", [adminEmail]);

  if (existing) {
    logger.info("Admin account already exists.");
    return;
  }

  const id = uuid();
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const now = new Date().toISOString();

  await sqlite.run(
    `INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, adminName, adminEmail, passwordHash, "ADMIN", now, now]
  );

  logger.info({ email: adminEmail, password: adminPassword }, "Admin account created successfully");
}

main().catch((error) => {
  console.error("Failed to seed admin:", error);
  process.exit(1);
});
