const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Get tasks
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Query filters
router.get("/", auth, async (req, res) => {
  const { sort, filter, q } = req.query; // optional
  let query = { user: req.user.id };
  if (filter === "completed") query.completed = true;
  if (filter === "pending") query.completed = false;
  if (q) query.$or = [{ title: new RegExp(q, "i") }, { description: new RegExp(q, "i") }, { subject: new RegExp(q,"i") }];

  let cursor = Task.find(query);
  if (sort === "priority") cursor = cursor.sort({ priority: 1 });
  else cursor = cursor.sort({ date: 1 });

  const tasks = await cursor.exec();
  res.json(tasks);
});

// Create task
router.post("/", auth, async (req, res) => {
  const { title, description, date, priority, subject, teamMembers } = req.body;
  const task = await Task.create({
    user: req.user.id,
    title, description, date, priority, subject,
    teamMembers: teamMembers || []
  });
  res.json(task);
});

// Update task
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
});

module.exports = router;
