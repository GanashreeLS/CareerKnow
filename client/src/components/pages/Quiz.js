import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Select, FormControl, InputLabel, MenuItem} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Quiz() {
  const [answers, setAnswers] = useState({ interest: '', skills: '' }); // { interest: 'java', skills: 'react' }
  const navigate = useNavigate();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/api/recommend', answers); // calling backend api
    localStorage.setItem('careerResults', JSON.stringify(res.data));
    navigate('/results');
  };

  return (
    <Container>
      <Typography variant="h4">Career Quiz</Typography>
      <TextField label="Interests" fullWidth margin="normal" onChange={e => setAnswers({ ...answers, interest: e.target.value })} />
      <TextField label="Skills" fullWidth margin="normal" onChange={e => setAnswers({ ...answers, skills: e.target.value })} />
      <Button variant="contained" onClick={handleSubmit}>Get Recommendations</Button>
    </Container>
  );
}

export default Quiz;
