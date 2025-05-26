const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "firstname lastname email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const { firstName: firstname, lastName: lastname, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { firstname, lastname, email },
    { new: true }
  );
  res.json(updatedUser);
});

module.exports = router;
