const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./database/db");

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("TaskNest server is running...");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
