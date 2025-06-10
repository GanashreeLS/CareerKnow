const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Get all courses by technology (for users)
router.get("/", async (req, res) => {
  try {
    const { technology } = req.query;
    const query = technology ? { technology } : {};
    const courses = await Course.find(query);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// Add a course (Admin only)
router.post("/", async (req, res) => {
  const { title, youtubeId, technology } = req.body;

  if (!title || !youtubeId || !technology) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newCourse = new Course({ title, youtubeId, technology });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: "Error saving course" });
  }
});

// Delete a course by ID (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting course" });
  }
});

module.exports = router;
