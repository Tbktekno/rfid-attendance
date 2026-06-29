import { v4 as uuid } from "uuid";
import { sqlite, connectSqlite } from "../shared/database/sqlite";
import { logger } from "../shared/logger";

async function main() {
  await connectSqlite();

  // 1. Create Dummy Employees if none exist
  const existingEmployees = sqlite.all("SELECT id FROM employees LIMIT 1");
  let employeeIds: string[] = [];

  if (existingEmployees.length === 0) {
    logger.info("No employees found. Creating dummy employees...");
    const dummyEmployees = [
      { name: "Budi Santoso", dept: "Produksi", pos: "Operator", rfid: "D1E2F3A4" },
      { name: "Siti Aminah", dept: "HRD", pos: "Staff", rfid: "A1B2C3D4" },
      { name: "Andi Wijaya", dept: "IT", pos: "Developer", rfid: "E5F6G7H8" }
    ];

    for (const emp of dummyEmployees) {
      const id = uuid();
      const now = new Date().toISOString();
      await sqlite.run(
        `INSERT INTO employees (id, full_name, department, position, rfid_uid, is_active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 1, ?, ?)`,
        [id, emp.name, emp.dept, emp.pos, emp.rfid, now, now]
      );
      employeeIds.push(id);
    }
  } else {
    employeeIds = sqlite.all<{ id: string }>("SELECT id FROM employees").map(e => e.id);
  }

  // 2. Create 10 Dummy Attendance Records
  logger.info("Creating 10 dummy attendance records...");
  const statuses = ["VALID", "VALID", "VALID", "VALID", "INVALID", "VALID", "VALID", "INVALID", "VALID", "VALID"];
  
  for (let i = 0; i < 10; i++) {
    const sessionId = uuid();
    const recordId = uuid();
    const employeeId = employeeIds[i % employeeIds.length];
    const employee = sqlite.get<{ rfid_uid: string, full_name: string }>("SELECT rfid_uid, full_name FROM employees WHERE id = ?", [employeeId]);
    
    const now = new Date();
    // Spread across the day (roughly)
    now.setHours(7 + i, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    const timestamp = now.toISOString();
    
    const status = statuses[i];
    const correlationId = `DUMMY-${Date.now()}-${i + 1}`;

    // Create Session
    await sqlite.run(
      `INSERT INTO attendance_sessions (id, correlation_id, rfid_uid, status, started_at, last_event_at, expires_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [sessionId, correlationId, employee?.rfid_uid || null, status === "VALID" ? "COMPLETED" : "FAILED", timestamp, timestamp, timestamp, timestamp, timestamp]
    );

    // Create Record
    const category = i % 2 === 0 ? "ENTRY" : "EXIT";
    const punctuality = i % 3 === 0 ? "LATE" : "ON_TIME";

    await sqlite.run(
      `INSERT INTO attendance_records (id, session_id, employee_id, rfid_uid, status, category, punctuality, verified_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [recordId, sessionId, employeeId, employee?.rfid_uid || "UNKNOWN", status, category, punctuality, timestamp, timestamp, timestamp]
    );
  }

  logger.info("10 dummy attendance records created successfully.");
}

main().catch((error) => {
  console.error("Failed to seed dummy attendance:", error);
  process.exit(1);
});
