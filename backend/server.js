require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");

const app = express();

// Connect Mongo
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Backend running on port " + PORT));
