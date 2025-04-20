// components/Questionnaire.js
import React, { useEffect, useState } from 'react';
import {
  Typography, RadioGroup, Radio, FormControlLabel,
  CircularProgress, Box, Paper
} from '@mui/material';
import axios from 'axios';

const Questionnaire = ({ stream }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/questionnaire/${stream}`);
        setQuestions(res.data.questions);
      } catch (err) {
        console.error('Error fetching questionnaire:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [stream]);

  const handleChange = (index, value) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Questionnaire for {stream}</Typography>
      {questions.map((q, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2 }}>
          <Typography>{q.questionText}</Typography>
          <RadioGroup
            value={answers[idx] || ''}
            onChange={(e) => handleChange(idx, e.target.value)}
          >
            {q.options.map((opt, i) => (
              <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
            ))}
          </RadioGroup>
        </Paper>
      ))}
    </Box>
  );
};

export default Questionnaire;
