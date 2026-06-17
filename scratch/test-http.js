const axios = require("axios");

axios.get("http://localhost:3000/api/v1/employees", {
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZjBjNmEwNy1lMzA1LTRlMDYtOWY3NC1lODlkODk4NjdjMDciLCJlbWFpbCI6ImFkbWluQHJmaWQuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzgxNTQxODIwLCJleHAiOjE3ODE1NDU0MjB9.1h_l0snvSt6WMIU5AW0NAaVWtdNxB59OjuManLwu_YY"
  }
}).then(res => {
  console.log(JSON.stringify(res.data, null, 2));
}).catch(err => {
  console.error(err.response ? err.response.data : err.message);
});
