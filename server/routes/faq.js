const express = require("express");
const router = express.Router();
const Faq = require("../models/FAQSchema");

router.post("/", async (req, res) => {
  try {
    const { technology, questions } = req.body;

    if (!technology || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const newFaq = new Faq({ technology, questions });
    await newFaq.save();

    res.status(201).json({ message: "FAQ added successfully" });
  } catch (error) {
    console.error("Error saving FAQ:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
