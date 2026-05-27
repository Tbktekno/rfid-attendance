const jwt = require("jsonwebtoken");
const http = require("http");

const token = jwt.sign(
  {
    sub: "test-admin",
    email: "admin@rfid.com",
    role: "ADMIN",
  },
  process.env.JWT_SECRET || "super-secret-jwt",
  { expiresIn: "1h" }
);

const req = http.request(
  {
    hostname: "localhost",
    port: 3000,
    path: "/api/v1/attendance/export/pdf",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  },
  (res) => {
    console.log("Status Code:", res.statusCode);
    console.log("Headers:", JSON.stringify(res.headers, null, 2));
    
    let data = [];
    res.on("data", (chunk) => {
      data.push(chunk);
    });
    
    res.on("end", () => {
      const buffer = Buffer.concat(data);
      console.log("Body length:", buffer.length);
      if (res.statusCode >= 400) {
        console.log("Error Body:", buffer.toString());
      }
    });
  }
);

req.on("error", (e) => {
  console.error("Request Error:", e.message);
});

req.end();
