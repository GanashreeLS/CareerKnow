// models/Questionnaire.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
});

const QuestionnaireSchema = new mongoose.Schema({
  stream: String, // e.g., "Java+J2EE", "React", "MySQL"
  questions: [QuestionSchema]
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
