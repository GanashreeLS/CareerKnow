import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [answers, setAnswers] = useState({ interest: "", skills: "" }); // { interest: 'java', skills: 'react' }
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/recommend",
      answers
    ); // calling backend api
    localStorage.setItem("careerResults", JSON.stringify(res.data));
    navigate("/results");
  };

  return (
    <Container sx={{ width: "60em" }}>
      <Typography variant="h4">Career Quiz</Typography>
      {/* <TextField label="Interests" fullWidth margin="normal" onChange={e => setAnswers({ ...answers, interest: e.target.value })} /> */}
      <FormControl fullWidth>
        <InputLabel id="interests-label">Interests</InputLabel>
        <Select
          labelId="interests-label"
          id="interests-select"
          value={answers.interest}
          label="Interests"
          onChange={(e) => setAnswers({ ...answers, interest: e.target.value })}
        >
          <MenuItem value={"Development"}>development</MenuItem>
          <MenuItem value={"testing"}>Testing</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="skills-label">Skills</InputLabel>
        <Select
          labelId="skills-label"
          id="skills-select"
          value={answers.skills}
          label="Skills"
          onChange={(e) => setAnswers({ ...answers, skills: e.target.value })}
        >
          <MenuItem value={"java"}>Java</MenuItem>
          <MenuItem value={"react"}>React</MenuItem>
          <MenuItem value={"mysql"}>MySQL</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSubmit}>
        Get Recommendations
      </Button>
    </Container>
  );
}

export default Quiz;
