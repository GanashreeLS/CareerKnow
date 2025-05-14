import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (candidateType === "fresher") {
      setFormData({
        name: "John Doe",
        email: "john@example.com",
        education: "B.Tech in Computer Science, 2024",
        experience: "Completed internship at ABC Tech.",
        skills: ["Java", "React", "HTML", "CSS"],
      });
    } else {
      setFormData({
        name: "Jane Smith",
        email: "jane@example.com",
        education: "B.Tech in Computer Science, 2018",
        experience: "5 years experience as Full Stack Developer at XYZ Corp.",
        skills: ["Java", "Spring Boot", "React", "AWS"],
      });
    }
  }, [candidateType]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (event, value) => {
    setFormData({ ...formData, skills: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(18);
    doc.text(formData.name, 10, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`${formData.email}`, 10, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Education", 10, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    doc.text(formData.education, 10, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Experience", 10, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    doc.text(doc.splitTextToSize(formData.experience, 180), 10, y);
    y += 20;

    doc.setFont("helvetica", "bold");
    doc.text("Skills", 10, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    doc.text(formData.skills.join(", "), 10, y);

    doc.save("resume.pdf");
  };

  const generateWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: formData.name, bold: true, size: 28 }),
              ],
            }),
            new Paragraph(formData.email),
            new Paragraph(""),

            new Paragraph({
              children: [
                new TextRun({ text: "Education", bold: true, size: 24 }),
              ],
            }),
            new Paragraph(formData.education),
            new Paragraph(""),

            new Paragraph({
              children: [
                new TextRun({ text: "Experience", bold: true, size: 24 }),
              ],
            }),
            new Paragraph(formData.experience),
            new Paragraph(""),

            new Paragraph({
              children: [new TextRun({ text: "Skills", bold: true, size: 24 })],
            }),
            new Paragraph(formData.skills.join(", ")),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "resume.docx");
  };

  const handleGenerate = () => {
    format === "pdf" ? generatePDF() : generateWord();
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
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
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Education"
        name="education"
        value={formData.education}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Experience"
        name="experience"
        value={formData.experience}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Autocomplete
        multiple
        options={SKILL_OPTIONS}
        value={formData.skills}
        onChange={handleSkillsChange}
        renderInput={(params) => (
          <TextField {...params} label="Skills" margin="normal" />
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
