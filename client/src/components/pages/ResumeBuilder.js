import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

const SKILL_OPTIONS = [
  "Java",
  "Spring Boot",
  "React",
  "Node.js",
  "JavaScript",
  "HTML",
  "CSS",
  "Docker",
  "AWS",
  "MongoDB",
  "MySQL",
];

const ResumeBuilder = () => {
  const [candidateType, setCandidateType] = useState("fresher");
  const [format, setFormat] = useState("pdf");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    experience: "",
    skills: [],
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateFields = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.education.trim())
      newErrors.education = "Education is required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";
    if (formData.skills.length === 0)
      newErrors.skills = "Please select at least one skill";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (event, value) => {
    setFormData({ ...formData, skills: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;

    doc.setLineWidth(2);
    doc.rect(10, 10, 190, 277);

    doc.setFontSize(18);
    doc.text(formData.name, margin + 5, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(formData.email, margin + 5, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Education", margin + 5, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(formData.education, 180), margin + 5, y);
    y += 15;

    doc.setFont("helvetica", "bold");
    doc.text("Experience", margin + 5, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(doc.splitTextToSize(formData.experience, 180), margin + 5, y);
    y += 20;

    doc.setFont("helvetica", "normal");
    doc.text(formData.skills.join(", "), margin + 5, y);

    doc.setFont("helvetica", "bold");
    doc.text("Skills", margin + 5, y);
    y += 7;

    doc.save("resume.pdf");
  };

  const generateWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              borderTop: { style: "single", size: 24, color: "000000" },
              borderBottom: { style: "single", size: 24, color: "000000" },
              borderLeft: { style: "single", size: 24, color: "000000" },
              borderRight: { style: "single", size: 24, color: "000000" },
              margin: {
                top: 720,
                bottom: 720,
                left: 720,
                right: 720,
              },
            },
          },
          children: [
            new Paragraph({
              spacing: { after: 200 },
              children: [
                new TextRun({ text: formData.name, bold: true, size: 28 }),
              ],
            }),
            new Paragraph({
              spacing: { after: 200 },
              children: [new TextRun({ text: formData.email, size: 24 })],
            }),
            new Paragraph(""),

            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({ text: "Education", bold: true, size: 26 }),
              ],
            }),
            new Paragraph({
              text: formData.education,
              spacing: { after: 300 },
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [new TextRun({ text: "Skills", bold: true, size: 26 })],
            }),
            new Paragraph({
              text: formData.skills.join(", "),
              spacing: { after: 100 },
            }),

            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({ text: "Experience", bold: true, size: 26 }),
              ],
            }),
            new Paragraph({
              text: formData.experience,
              spacing: { after: 300 },
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "resume.docx");
  };

  const handleGenerate = () => {
    if (validateFields()) {
      format === "pdf" ? generatePDF() : generateWord();
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        bgcolor: "white",
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center" p={1}>
        Resume Builder
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Candidate Type</InputLabel>
        <Select
          value={candidateType}
          onChange={(e) => setCandidateType(e.target.value)}
          label="Candidate Type"
        >
          <MenuItem value="fresher">Fresher</MenuItem>
          <MenuItem value="experienced">Experienced</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />

      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        label="Education"
        name="education"
        value={formData.education}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.education}
        helperText={errors.education}
      />

      <TextField
        label="Experience"
        name="experience"
        value={formData.experience}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        error={!!errors.experience}
        helperText={errors.experience}
      />

      <Autocomplete
        multiple
        options={SKILL_OPTIONS}
        value={formData.skills}
        onChange={handleSkillsChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Skills"
            margin="normal"
            error={!!errors.skills}
            helperText={errors.skills}
          />
        )}
        fullWidth
      />

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Resume Format</InputLabel>
        <Select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          label="Resume Format"
        >
          <MenuItem value="pdf">PDF</MenuItem>
          <MenuItem value="word">Word (DOCX)</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleGenerate}
      >
        Generate Resume
      </Button>
    </Box>
  );
};

export default ResumeBuilder;
