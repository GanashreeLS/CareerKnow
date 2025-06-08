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
  Stack,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Recommend() {
  const [answers, setAnswers] = useState({
    interest: "",
    skills: "",
    salary: "",
    location: "",
    worktype: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};

    if (!answers.interest) newErrors.interest = "Interest is required";
    if (!answers.skills) newErrors.skills = "Skills are required";
    if (!answers.salary) newErrors.salary = "Salary is required";
    if (!answers.location) newErrors.location = "Location is required";
    if (!answers.worktype) newErrors.worktype = "Work type is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/recommend",
        answers
      );
      localStorage.setItem("careerResults", JSON.stringify(res.data));
      navigate("/results");
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <Container
      sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, bgcolor: "white" }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", padding: "0.5em" }}>
        Career Recommendations
      </Typography>

      <Stack spacing={2} width={"40vw"} sx={{ margin: "0 auto" }}>
        {/* Interest */}
        <FormControl fullWidth error={!!errors.interest}>
          <InputLabel id="interests-label">Interests</InputLabel>
          <Select
            labelId="interests-label"
            id="interests-select"
            value={answers.interest}
            label="Interests"
            onChange={(e) =>
              setAnswers({ ...answers, interest: e.target.value })
            }
          >
            <MenuItem value={"Development"}>Software Development</MenuItem>
            <MenuItem value={"Testing"}>Testing</MenuItem>
            <MenuItem value={"Cybersecurity"}>Cybersecurity</MenuItem>
            <MenuItem value={"Digital Marketing"}>Digital Marketing</MenuItem>
            <MenuItem value={"Project Management"}>Project Management</MenuItem>
          </Select>
          <FormHelperText>{errors.interest}</FormHelperText>
        </FormControl>

        {/* Skills */}
        <FormControl fullWidth error={!!errors.skills}>
          <InputLabel id="skills-label">Skills</InputLabel>
          <Select
            labelId="skills-label"
            id="skills-select"
            value={answers.skills}
            label="Skills"
            onChange={(e) => setAnswers({ ...answers, skills: e.target.value })}
          >
            <MenuItem value={"java"}>Java</MenuItem>
            <MenuItem value={"sql"}>SQL</MenuItem>
            <MenuItem value={"python"}>Python</MenuItem>
          </Select>
          <FormHelperText>{errors.skills}</FormHelperText>
        </FormControl>

        {/* Salary */}
        <FormControl fullWidth error={!!errors.salary}>
          <InputLabel id="salary-label">Salary (INR)</InputLabel>
          <Select
            labelId="salary-label"
            id="salary-select"
            value={answers.salary}
            label="Salary (INR)"
            onChange={(e) => setAnswers({ ...answers, salary: e.target.value })}
          >
            <MenuItem value={"250000-350000"}>250000-350000</MenuItem>
            <MenuItem value={"350000-450000"}>350000-450000</MenuItem>
            <MenuItem value={"450000-550000"}>450000-550000</MenuItem>
          </Select>
          <FormHelperText>{errors.salary}</FormHelperText>
        </FormControl>

        {/* Location */}
        <FormControl fullWidth error={!!errors.location}>
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            id="location-select"
            value={answers.location}
            label="Location"
            onChange={(e) =>
              setAnswers({ ...answers, location: e.target.value })
            }
          >
            <MenuItem value={"Bengaluru"}>Bengaluru</MenuItem>
            <MenuItem value={"Chennai"}>Chennai</MenuItem>
            <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
          </Select>
          <FormHelperText>{errors.location}</FormHelperText>
        </FormControl>

        {/* Work Type */}
        <FormControl fullWidth error={!!errors.worktype}>
          <InputLabel id="worktype-label">Work Type</InputLabel>
          <Select
            labelId="worktype-label"
            id="worktype-select"
            value={answers.worktype}
            label="Work Type"
            onChange={(e) =>
              setAnswers({ ...answers, worktype: e.target.value })
            }
          >
            <MenuItem value={"Hybrid"}>Hybrid</MenuItem>
            <MenuItem value={"On Site"}>On Site</MenuItem>
            <MenuItem value={"Remote"}>Remote</MenuItem>
          </Select>
          <FormHelperText>{errors.worktype}</FormHelperText>
        </FormControl>

        <Button variant="contained" onClick={handleSubmit}>
          Get Recommendations
        </Button>
      </Stack>
    </Container>
  );
}

export default Recommend;
