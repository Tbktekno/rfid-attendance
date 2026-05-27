const { sqlite, connectSqlite } = require("../src/shared/database/sqlite");

async function main() {
  await connectSqlite();
  const users = sqlite.all("SELECT id, name, email, role FROM users");
  console.log("Users in DB:", users);
}

main().catch(console.error);
