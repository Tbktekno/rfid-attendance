const axios = require("axios");

axios.get("http://localhost:3000/api/v1/attendance/history?page=1&limit=50", {
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZjBjNmEwNy1lMzA1LTRlMDYtOWY3NC1lODlkODk4NjdjMDciLCJlbWFpbCI6ImFkbWluQHJmaWQuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzgxNTQxODIwLCJleHAiOjE3ODE1NDU0MjB9.1h_l0snvSt6WMIU5AW0NAaVWtdNxB59OjuManLwu_YY"
  }
}).then(res => {
  console.log("History works:", res.data.totalRecords);
}).catch(err => {
  console.error("History error:", err.response ? err.response.data : err.message);
});

axios.get("http://localhost:3000/api/v1/devices", {
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZjBjNmEwNy1lMzA1LTRlMDYtOWY3NC1lODlkODk4NjdjMDciLCJlbWFpbCI6ImFkbWluQHJmaWQuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzgxNTQxODIwLCJleHAiOjE3ODE1NDU0MjB9.1h_l0snvSt6WMIU5AW0NAaVWtdNxB59OjuManLwu_YY"
  }
}).then(res => {
  console.log("Devices works:", res.data.devices.length);
}).catch(err => {
  console.error("Devices error:", err.response ? err.response.data : err.message);
});

axios.get("http://localhost:3000/api/v1/attendance/sessions", {
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZjBjNmEwNy1lMzA1LTRlMDYtOWY3NC1lODlkODk4NjdjMDciLCJlbWFpbCI6ImFkbWluQHJmaWQuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzgxNTQxODIwLCJleHAiOjE3ODE1NDU0MjB9.1h_l0snvSt6WMIU5AW0NAaVWtdNxB59OjuManLwu_YY"
  }
}).then(res => {
  console.log("Sessions works:", res.data.sessions.length);
}).catch(err => {
  console.error("Sessions error:", err.response ? err.response.data : err.message);
});
