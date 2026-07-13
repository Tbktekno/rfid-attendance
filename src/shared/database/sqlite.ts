import fs from "node:fs/promises";
import path from "node:path";
import initSqlJs, { Database, SqlJsStatic } from "sql.js";
import { env } from "../../config/env";
import { logger } from "../logger";

let sqlJs: SqlJsStatic | null = null;
let database: Database | null = null;

const schemaSql = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'OPERATOR',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  department TEXT,
  position TEXT,
  rfid_uid TEXT NOT NULL UNIQUE,
  face_descriptor TEXT,
  face_image_path TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  device_code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  name TEXT,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'OFFLINE',
  metadata TEXT,
  last_seen_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS attendance_sessions (
  id TEXT PRIMARY KEY,
  correlation_id TEXT NOT NULL UNIQUE,
  pairing_key TEXT,
  rfid_uid TEXT,
  rfid_device_code TEXT,
  face_device_code TEXT,
  face_image_path TEXT,
  verification_queued INTEGER NOT NULL DEFAULT 0,
  verification_attempts INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'PENDING',
  reason TEXT,
  started_at TEXT NOT NULL,
  last_event_at TEXT NOT NULL,
  verified_at TEXT,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS attendance_records (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  employee_id TEXT,
  rfid_uid TEXT NOT NULL,
  status TEXT NOT NULL,
  punctuality TEXT,
  confidence REAL,
  reason TEXT,
  image_path TEXT,
  rfid_device_code TEXT,
  face_device_code TEXT,
  verified_at TEXT NOT NULL,
  raw_payload TEXT,
  category TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(session_id) REFERENCES attendance_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY(employee_id) REFERENCES employees(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS system_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_employees_rfid_uid ON employees(rfid_uid);
CREATE INDEX IF NOT EXISTS idx_devices_device_code ON devices(device_code);
CREATE INDEX IF NOT EXISTS idx_attendance_sessions_correlation_id ON attendance_sessions(correlation_id);
CREATE INDEX IF NOT EXISTS idx_attendance_sessions_status ON attendance_sessions(status);
CREATE INDEX IF NOT EXISTS idx_attendance_records_status ON attendance_records(status);
CREATE INDEX IF NOT EXISTS idx_attendance_records_verified_at ON attendance_records(verified_at DESC);
`;

const locateSqlWasm = (file: string): string =>
  path.resolve(process.cwd(), "node_modules", "sql.js", "dist", file);

const persist = async (): Promise<void> => {
  if (!database) {
    return;
  }

  await fs.mkdir(path.dirname(env.sqlitePathAbsolute), { recursive: true });
  const data = database.export();
  await fs.writeFile(env.sqlitePathAbsolute, Buffer.from(data));
};

const getDb = (): Database => {
  if (!database) {
    throw new Error("SQLite database has not been initialized");
  }

  return database;
};

const normalizeParams = (params: Array<string | number | null>): Array<string | number | null> =>
  params.map((value) => (typeof value === "boolean" ? Number(value) : value));

export const connectSqlite = async (): Promise<void> => {
  if (database) {
    return;
  }

  if (!sqlJs) {
    sqlJs = await initSqlJs({
      locateFile: locateSqlWasm
    });
  }

  await fs.mkdir(path.dirname(env.sqlitePathAbsolute), { recursive: true });

  try {
    const file = await fs.readFile(env.sqlitePathAbsolute);
    database = new sqlJs.Database(file);
  } catch {
    database = new sqlJs.Database();
  }

  database.exec(schemaSql);

  // Migration: Add employee_id to attendance_records if it exists as student_id
  try {
    const tableInfo = database.prepare("PRAGMA table_info(attendance_records)");
    let hasEmployeeId = false;
    let hasStudentId = false;
    while (tableInfo.step()) {
      const column = tableInfo.getAsObject() as any;
      if (column.name === "employee_id") hasEmployeeId = true;
      if (column.name === "student_id") hasStudentId = true;
    }
    tableInfo.free();

    if (!hasEmployeeId) {
      if (hasStudentId) {
        // Simple way: Add column. In a real production apps we might want to migrate data.
        database.run("ALTER TABLE attendance_records ADD COLUMN employee_id TEXT");
        // Optional: migrate data
        database.run("UPDATE attendance_records SET employee_id = student_id");
      } else {
        database.run("ALTER TABLE attendance_records ADD COLUMN employee_id TEXT");
      }
    }
  } catch (e) {
    logger.warn({ error: e }, "Migration: Failed to add employee_id column");
  }

  // Migration: Add category column if it doesn't exist (from previous versions)
  try {
    const tableInfo = database.prepare("PRAGMA table_info(attendance_records)");
    let hasCategory = false;
    while (tableInfo.step()) {
      const column = tableInfo.getAsObject() as any;
      if (column.name === "category") {
        hasCategory = true;
        break;
      }
    }
    tableInfo.free();

    if (!hasCategory) {
      database.run("ALTER TABLE attendance_records ADD COLUMN category TEXT");
    }
  } catch (e) {
    logger.warn({ error: e }, "Migration: Failed to add category column");
  }
  
  // Seed default settings
  const now = new Date().toISOString();
  
  // Ensure indexes that depend on migrated columns
  try {
    database.run("CREATE INDEX IF NOT EXISTS idx_attendance_records_employee_id ON attendance_records(employee_id)");
  } catch (e) {
    logger.warn({ error: e }, "Migration: Failed to create employee_id index");
  }
  database.run(
    `INSERT OR IGNORE INTO system_settings (key, value, created_at, updated_at) VALUES (?, ?, ?, ?)`,
    ['entry_time', '07:30', now, now]
  );
  database.run(
    `INSERT OR IGNORE INTO system_settings (key, value, created_at, updated_at) VALUES (?, ?, ?, ?)`,
    ['exit_time', '14:00', now, now]
  );
  database.run(
    `INSERT OR IGNORE INTO system_settings (key, value, created_at, updated_at) VALUES (?, ?, ?, ?)`,
    ['early_exit_tolerance', '15', now, now]
  );
  database.run(
    `INSERT OR IGNORE INTO system_settings (key, value, created_at, updated_at) VALUES (?, ?, ?, ?)`,
    ['overtime_threshold', '60', now, now]
  );
  database.run(
    `INSERT OR IGNORE INTO system_settings (key, value, created_at, updated_at) VALUES (?, ?, ?, ?)`,
    ['working_days', '1,2,3,4,5', now, now]
  );
  database.run(
    `INSERT OR IGNORE INTO system_settings (key, value, created_at, updated_at) VALUES (?, ?, ?, ?)`,
    ['holidays', '[]', now, now]
  );

  await persist();
  logger.info({ path: env.sqlitePathAbsolute }, "Connected to SQLite");
};

export const sqlite = {
  async run(sql: string, params: Array<string | number | null> = []): Promise<void> {
    const db = getDb();
    db.run(sql, normalizeParams(params));
    await persist();
  },
  get<T>(sql: string, params: Array<string | number | null> = []): T | null {
    const db = getDb();
    const statement = db.prepare(sql, normalizeParams(params));

    try {
      if (!statement.step()) {
        return null;
      }

      return statement.getAsObject() as T;
    } finally {
      statement.free();
    }
  },
  all<T>(sql: string, params: Array<string | number | null> = []): T[] {
    const db = getDb();
    const statement = db.prepare(sql, normalizeParams(params));
    const rows: T[] = [];

    try {
      while (statement.step()) {
        rows.push(statement.getAsObject() as T);
      }
    } finally {
      statement.free();
    }

    return rows;
  },
  async exec(sql: string): Promise<void> {
    const db = getDb();
    db.exec(sql);
    await persist();
  }
};
