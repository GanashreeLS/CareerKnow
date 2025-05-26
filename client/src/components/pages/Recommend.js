import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Autocomplete,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Recommend() {
  const [answers, setAnswers] = useState({
    interest: [],
    skills: "",
    salary: "",
    location: "",
    worktype: "",
  }); // { interest: 'java', skills: 'react' }
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/recommend",
      answers
    ); // calling backend api
    localStorage.setItem("careerResults", JSON.stringify(res.data));
    navigate("/results");
  };

  // useEffect(() => { alert("component loaded")}, []);

  return (
    <Container
      sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, bgcolor: "white" }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", padding: "0.5em" }}>
        Career Recommendations
      </Typography>

      {/* <TextField label="Interests" fullWidth margin="normal" onChange={e => setAnswers({ ...answers, interest: e.target.value })} /> */}

      <Stack spacing={2} width={"40vw"} sx={{ margin: "0 auto" }}>
        <FormControl fullWidth>
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
        </FormControl>
        {/* <FormControl fullWidth className="form-field">
          <Autocomplete
            multiple
            id="tags-standard"
            options={interests}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Interests"
                placeholder="Interests"
              />
            )}
          />
        </FormControl> */}

        <FormControl fullWidth className="form-field">
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
        </FormControl>

        <FormControl fullWidth className="form-field">
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
        </FormControl>
        <FormControl fullWidth className="form-field">
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
        </FormControl>
        <FormControl fullWidth className="form-field">
          <InputLabel id="salary-label">Work Type</InputLabel>
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
        </FormControl>

        <Button variant="contained" onClick={handleSubmit}>
          Get Recommendations
        </Button>
      </Stack>
    </Container>
  );
}

const interests = [
  { title: "Development", year: 1994 },
  { title: "Testing", year: 1972 },
  { title: "DevOps", year: 1974 },
  { title: "Data Analyst", year: 2008 },
  { title: "Data Engineer", year: 1957 },
];

export default Recommend;
