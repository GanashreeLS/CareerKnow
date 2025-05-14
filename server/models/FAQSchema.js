const mongoose = require("mongoose");
const faqSchema = new mongoose.Schema({
  technology: { type: String, required: true },
  questions: [
    {
      question: String,
      answer: String,
    },
  ],
});

module.exports = mongoose.model("faq", faqSchema);
