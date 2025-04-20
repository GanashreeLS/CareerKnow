const express = require("express");
const router = express.Router();
const Questionnaire = require("../models/Questionnaire");

router.get("/:stream", async (req, res) => {
  const { stream } = req.params;
  const data = await Questionnaire.findOne({ stream});
  if (!data) return res.status(404).json({ error: "Stream not found" });
  res.json(data);
});

module.exports = router;
