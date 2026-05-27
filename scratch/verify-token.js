const jwt = require("jsonwebtoken");
const secret = "super-secret-jwt";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZjBjNmEwNy1lMzA1LTRlMDYtOWY3NC1lODlkODk4NjdjMDciLCJlbWFpbCI6ImFkbWluQHJmaWQuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzc3MzYzMzExLCJleHAiOjE3Nzc0NDk3MTF9.m20wNtf75VjIO-lj8oadv1tHYRgZ7jiJXOp7ANPW3nM";

try {
  const decoded = jwt.verify(token, secret);
  console.log("Decoded:", decoded);
} catch (err) {
  console.error("Error:", err.name, err.message);
  if (err.expiredAt) {
    console.error("Expired at:", new Date(err.expiredAt).toISOString());
  }
}
