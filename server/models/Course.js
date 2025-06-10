const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeId: { type: String, required: true },
  technology: { type: String, required: true }, // e.g., Java, React, etc.
});

module.exports = mongoose.model("Course", courseSchema);
