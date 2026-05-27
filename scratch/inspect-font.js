const fs = require("node:fs");
const path = require("node:path");

const filePath = path.resolve("src/assets/fonts/Roboto-Regular.ttf");
const buffer = fs.readFileSync(filePath);

console.log("File size:", buffer.length);
console.log("First 16 bytes (hex):", buffer.slice(0, 16).toString("hex"));
console.log("First 16 bytes (utf8):", buffer.slice(0, 16).toString("utf8"));
