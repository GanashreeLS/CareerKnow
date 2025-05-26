import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import axios from "axios";

export default function AddFaq() {
  const [technology, setTechnology] = useState("");
  const [technologyError, setTechnologyError] = useState(false);
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [questionsError, setQuestionsError] = useState("");

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    let valid = true;

    if (!technology.trim()) {
      setTechnologyError(true);
      valid = false;
    } else {
      setTechnologyError(false);
    }

    if (questions.length === 0) {
      setQuestionsError("Please add at least one question and answer.");
      valid = false;
    } else {
      for (let i = 0; i < questions.length; i++) {
        if (!questions[i].question.trim() || !questions[i].answer.trim()) {
          setQuestionsError(`Question ${i + 1} and answer cannot be empty.`);
          valid = false;
          break;
        }
      }
      if (valid) setQuestionsError("");
    }

    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/faqs", {
        technology,
        questions,
      });
      alert("FAQ added successfully!");
      setTechnology("");
      setQuestions([{ question: "", answer: "" }]);
    } catch (error) {
      alert("Error adding FAQ.");
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 3, bgcolor: "white" }}>
      <Typography variant="h5" mb={2}>
        Add FAQs
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }} error={technologyError}>
        <InputLabel>Technology</InputLabel>
        <Select
          value={technology}
          label="Technology"
          onChange={(e) => setTechnology(e.target.value)}
        >
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="react">React</MenuItem>
          <MenuItem value="mongodb">MongoDB</MenuItem>
          <MenuItem value="php">PHP</MenuItem>
        </Select>
        {technologyError && (
          <FormHelperText>Technology is required</FormHelperText>
        )}
      </FormControl>

      {questions.map((qa, index) => (
        <Card key={index} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <TextField
              label="Question"
              fullWidth
              value={qa.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
              margin="normal"
              error={questionsError && !qa.question.trim()}
            />
            <TextField
              label="Answer"
              fullWidth
              multiline
              value={qa.answer}
              onChange={(e) =>
                handleQuestionChange(index, "answer", e.target.value)
              }
              margin="normal"
              error={questionsError && !qa.answer.trim()}
            />
            <IconButton
              onClick={() => removeQuestion(index)}
              disabled={questions.length === 1}
            >
              <Delete />
            </IconButton>
          </CardContent>
        </Card>
      ))}

      {questionsError && (
        <Typography color="error" sx={{ mb: 2 }}>
          {questionsError}
        </Typography>
      )}

      <Button startIcon={<Add />} onClick={addQuestion} sx={{ mb: 2 }}>
        Add Another Question
      </Button>

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
