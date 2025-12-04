require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Health check route
app.get("/", (req, res) => {
  res.send("TaskNest backend is running");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
