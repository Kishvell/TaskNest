const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// GET tasks
router.get("/", auth, async (req, res) => {
  try {
    const { sort, filter, q } = req.query;

    let query = { user: req.user.id };

    if (filter === "completed") query.completed = true;
    if (filter === "pending") query.completed = false;

    if (q) {
      query.$or = [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { subject: new RegExp(q, "i") }
      ];
    }

    let cursor = Task.find(query).populate("teamMembers", "name email");

    if (sort === "priority") cursor = cursor.sort({ priority: 1 });
    else cursor = cursor.sort({ date: 1 });

    const tasks = await cursor.exec();
    res.json(tasks);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, date, priority, subject, teamMembers } = req.body;

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      date,
      priority,
      subject,
      teamMembers: teamMembers || []
    });

    const populated = await Task.findById(task._id).populate("teamMembers", "name email");
    res.json(populated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE task
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("teamMembers", "name email");

    res.json(updated);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
