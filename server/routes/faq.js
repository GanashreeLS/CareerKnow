const express = require("express");
const router = express.Router();
const Faq = require("../models/FAQSchema");

router.post("/", async (req, res) => {
  const { technology, questions } = req.body;
  if (!technology || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: "Invalid data" });
  }
  try {
    let existing = await Faq.findOne({ technology });

    if (existing) {
      // Append new questions to existing technology
      existing.questions.push(...questions);
      await existing.save();
      return res
        .status(200)
        .json({ message: "FAQ updated successfully", data: existing });
    } else {
      // Create new document if technology doesn't exist
      const newFaq = new Faq({ technology, questions });
      await newFaq.save();
      return res
        .status(201)
        .json({ message: "FAQ created successfully", data: newFaq });
    }
  } catch (error) {
    console.error("Error saving FAQ:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

router.get("/:technology", async (req, res) => {
  try {
    const technology = req.params.technology;
    const faqs = await Faq.find({
      technology: new RegExp(`^${technology}$`, "i"),
    }); // case-insensitive
    res.json(faqs);
  } catch (error) {
    console.error("Error fetching filtered FAQs:", error);
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});
module.exports = router;
