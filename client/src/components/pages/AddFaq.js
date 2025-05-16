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
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import axios from "axios";

export default function AddFaq() {
  const [technology, setTechnology] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

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

  const handleSubmit = async () => {
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
    <Box>
      <Typography variant="h5" mb={2}>
        Add FAQs
      </Typography>
      {/* <TextField
        label="Technology"
        fullWidth
        value={technology}
        onChange={(e) => setTechnology(e.target.value)}
        margin="normal"
      /> */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Technology</InputLabel>
        <Select
          value={technology}
          label="Technology"
          onChange={(e) => setTechnology(e.target.value)}
        >
          <MenuItem key={"java"} value={"java"}>
            Java
          </MenuItem>
          <MenuItem key={"react"} value={"react"}>
            React
          </MenuItem>
          <MenuItem key={"mongodb"} value={"mongodb"}>
            MongoDB
          </MenuItem>
          <MenuItem key={"php"} value={"php"}>
            PHP
          </MenuItem>
        </Select>
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

      <Button startIcon={<Add />} onClick={addQuestion} sx={{ mb: 2 }}>
        Add Another Question
      </Button>

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
