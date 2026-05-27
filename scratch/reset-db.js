const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../storage/rfid_v3.sqlite');
const uploadDir = path.resolve(__dirname, '../storage/uploads');

const db = new sqlite3.Database(dbPath);

console.log('Starting database reset...');

db.serialize(() => {
  // 1. Delete attendance records
  db.run('DELETE FROM attendance_records', (err) => {
    if (err) console.error('Error deleting attendance_records:', err.message);
    else console.log('Cleared attendance_records');
  });

  // 2. Delete attendance sessions
  db.run('DELETE FROM attendance_sessions', (err) => {
    if (err) console.error('Error deleting attendance_sessions:', err.message);
    else console.log('Cleared attendance_sessions');
  });

  // 3. Delete devices
  db.run('DELETE FROM devices', (err) => {
    if (err) console.error('Error deleting devices:', err.message);
    else console.log('Cleared devices');
  });

  // 4. Delete employees
  db.run('DELETE FROM employees', (err) => {
    if (err) console.error('Error deleting employees:', err.message);
    else console.log('Cleared employees');
  });

  // 5. Delete students (legacy)
  db.run('DELETE FROM students', (err) => {
    if (err) console.error('Error deleting students:', err.message);
    else console.log('Cleared students');
  });

  // 6. Delete all users EXCEPT admin@rfid.com
  db.run("DELETE FROM users WHERE email != 'admin@rfid.com'", (err) => {
    if (err) console.error('Error deleting non-admin users:', err.message);
    else console.log('Cleared non-admin users');
  });

  // 7. Clear system settings (optional, but clean)
  db.run("DELETE FROM system_settings", (err) => {
     if (err) console.error('Error clearing system_settings:', err.message);
     else {
        console.log('Cleared system_settings');
        // Re-insert defaults
        db.run("INSERT INTO system_settings (id, entry_time, exit_time, created_at, updated_at) VALUES ('DEFAULT', '07:30', '14:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
     }
  });

  console.log('Database reset complete.');
});

db.close();

// Clear uploads
if (fs.existsSync(uploadDir)) {
  const files = fs.readdirSync(uploadDir);
  for (const file of files) {
    if (file !== '.gitkeep') {
      fs.unlinkSync(path.join(uploadDir, file));
    }
  }
  console.log('Cleared upload directory.');
}
