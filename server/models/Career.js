const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String]
});

module.exports = mongoose.model('careers', CareerSchema);
