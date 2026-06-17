const initSqlJs = require('sql.js');
const fs = require('fs');

async function test() {
  const SQL = await initSqlJs();
  const filebuffer = fs.readFileSync('storage/rfid_v3.sqlite');
  const db = new SQL.Database(filebuffer);
  
  const res = db.exec("SELECT id, verified_at, strftime('%Y-%m', verified_at) as m, strftime('%Y-%m', verified_at, 'localtime') as m_local FROM attendance_records LIMIT 5");
  
  if (res.length > 0) {
    console.log(res[0].columns);
    console.log(res[0].values);
  } else {
    console.log("No records");
  }
}
test();
