import bcrypt from "bcryptjs";
import { sqlite, connectSqlite } from "../shared/database/sqlite";
import { logger } from "../shared/logger";

async function main() {
  await connectSqlite();

  const adminEmail = "admin@rfid.com";
  const adminPassword = "password123";
  
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const now = new Date().toISOString();

  const existing = sqlite.get("SELECT id FROM users WHERE email = ?", [adminEmail]);

  if (existing) {
    await sqlite.run(
      "UPDATE users SET password_hash = ?, updated_at = ? WHERE email = ?",
      [passwordHash, now, adminEmail]
    );
    logger.info("Admin password reset to password123 successfully.");
  } else {
    logger.error("Admin user not found. Please run seed-admin.ts first.");
  }
}

main().catch(console.error);
