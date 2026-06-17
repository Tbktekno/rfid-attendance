const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('storage/rfid_v3.sqlite');
db.all("SELECT id, verified_at, strftime('%Y-%m', verified_at) as m, strftime('%Y-%m', verified_at, 'localtime') as m_local FROM attendance_records LIMIT 5", [], (err, rows) => {
  console.log(err, rows);
});
