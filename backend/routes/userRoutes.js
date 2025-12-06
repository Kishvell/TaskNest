const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.post("/resolve", auth, async (req, res) => {
  const { emails } = req.body;
  if (!emails || !Array.isArray(emails)) return res.status(400).json({ ids: [] });
  const users = await User.find({ email: { $in: emails } }, "_id email name");
  const ids = users.map(u => u._id);
  res.json({ ids, users });
});

router.get("/search", auth, async (req, res) => {
  const q = req.query.q || "";
  const users = await User.find({ email: new RegExp(q, "i") }).limit(10);
  res.json(users);
});

module.exports = router;
