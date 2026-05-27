import { v4 as uuid } from "uuid";
import { sqlite } from "../../../shared/database/sqlite";
import { UserEntity, UserRow, mapUserEntity } from "../entity/user.model";

export class UserRepository {
  async create(input: {
    name: string;
    email: string;
    passwordHash: string;
    role: "ADMIN" | "OPERATOR";
  }): Promise<UserEntity> {
    const id = uuid();
    const now = new Date().toISOString();

    await sqlite.run(
      `INSERT INTO users (id, name, email, password_hash, role, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, input.name, input.email, input.passwordHash, input.role, now, now]
    );

    return {
      id,
      name: input.name,
      email: input.email,
      role: input.role,
      createdAt: new Date(now),
      updatedAt: new Date(now)
    };
  }

  async findByEmail(email: string): Promise<(UserEntity & { passwordHash: string }) | null> {
    const row = sqlite.get<UserRow>(
      `SELECT id, name, email, password_hash, role, created_at, updated_at
       FROM users
       WHERE email = ?`,
      [email]
    );

    if (!row) {
      return null;
    }

    return {
      ...mapUserEntity(row),
      passwordHash: row.password_hash
    };
  }
}
