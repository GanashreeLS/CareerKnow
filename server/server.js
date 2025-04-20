const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recommendRoutes = require('./routes/recommend');
const authRoutes = require('./routes/auth');
const questionnaireRoutes= require('./routes/questionnaire');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/recommend', recommendRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/questionnaire', questionnaireRoutes);



mongoose.connect('mongodb://localhost:27017/careerknow', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
