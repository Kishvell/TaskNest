const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  date: String,
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ["low","medium","high"], default: "medium" },
  subject: { type: String, default: "" },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
