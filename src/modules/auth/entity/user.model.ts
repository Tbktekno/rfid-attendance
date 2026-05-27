export interface UserEntity {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "OPERATOR";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "ADMIN" | "OPERATOR";
  created_at: string;
  updated_at: string;
}

export const mapUserEntity = (row: UserRow): UserEntity => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role,
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at)
});
