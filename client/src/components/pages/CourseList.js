import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Link,
} from "@mui/material";

const courseData = {
  Java: [
    { title: "Java Full Course for Beginners", id: "8cm1x4bC610" },
    { title: "Java Tutorial for Beginners", id: "grEKMHGYyns" },
    {
      title: "Java Object-Oriented Programming (OOP) Concepts",
      id: "Hl-zzrqQoSE",
    },
    { title: "Java OOP Concepts Tutorial", id: "pTB0EiLXUC8" },
    { title: "Java OOP Concepts Explained", id: "n60Dn0UsbEk" },
    { title: "Java OOP Concepts with Examples", id: "sTX0UEplF54" },
  ],
  React: [
    { title: "React JS Full Course 2024", id: "bMknfKXIFA8" },
    { title: "React Hooks Tutorial", id: "-MlNBTSg_Ww" },
    { title: "React Crash Course", id: "w7ejDZ8SWv8" },
  ],
  MongoDB: [
    { title: "MongoDB Tutorial", id: "ofme2o29ngU" },
    { title: "MongoDB in 1 Hour", id: "YS4e4q9oBaU" },
    { title: "MongoDB Crash Course", id: "FwMwO8pXfq0" },
  ],
  PHP: [
    { title: "PHP Full Course", id: "OK_JCtrrv-c" },
    { title: "PHP in Hindi", id: "1SnPKhCdlsU" },
    { title: "PHP for Beginners", id: "z0n1aQ3IxWI" },
  ],
};

const CourseList = () => {
  const [selectedTech, setSelectedTech] = useState("Java");

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Popular YouTube Courses
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Technology</InputLabel>
        <Select
          value={selectedTech}
          label="Technology"
          onChange={(e) => setSelectedTech(e.target.value)}
        >
          {Object.keys(courseData).map((tech) => (
            <MenuItem key={tech} value={tech}>
              {tech}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {courseData[selectedTech].map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: "100%" }}>
              <Link
                href={`https://www.youtube.com/watch?v=${course.id}`}
                target="_blank"
                rel="noopener"
                underline="none"
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={`https://img.youtube.com/vi/${course.id}/hqdefault.jpg`}
                  alt={course.title}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {course.title}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList;
