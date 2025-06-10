import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQInterview = () => {
  const [faqData, setFaqData] = useState([]);

  const [selectedTech, setSelectedTech] = useState("java");
  const [technologies, setTechnologies] = useState([]);

  const fetchFaqs = async (technology = selectedTech) => {
    try {
      const endpoint = `http://localhost:5000/api/faqs/${technology}`;
      const response = await axios.get(endpoint);
      setFaqData(response.data?.questions);
    } catch (error) {
      console.error("Error fetching FAQs", error);
    }
  };
  const fetchTechnologies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/faqs");
      const allTechs = [...new Set(response.data.map((f) => f.technology))];
      setTechnologies(allTechs);
    } catch (error) {
      console.error("Error fetching technologies", error);
    }
  };

  useEffect(() => {
    fetchTechnologies();
    fetchFaqs();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 4,
        p: 3,
        bgcolor: "white",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", padding: "0.5em" }}
      >
        Interview FAQ
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Technology</InputLabel>
        <Select
          value={selectedTech}
          label="Technology"
          onChange={(e) => {
            const selected = e.target.value;
            setSelectedTech(selected);
            fetchFaqs(selected); // 👈 pass selected technology to fetchFaqs
          }}
        >
          {/* <MenuItem value="">All</MenuItem> */}
          {technologies.length > 0 &&
            technologies.map((tech, i) => (
              <MenuItem key={i} value={tech} selected>
                {tech}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom>
        {selectedTech} Questions & Answers:
      </Typography>

      {faqData.length > 0 &&
        faqData.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {index + 1}. {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};

export default FAQInterview;
