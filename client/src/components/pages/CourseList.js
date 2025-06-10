import React, { useState, useEffect } from "react";
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
import axios from "axios";

const technologies = ["Java", "React", "MongoDB", "PHP"];

const CourseList = () => {
  const [selectedTech, setSelectedTech] = useState("Java");
  const [courses, setCourses] = useState([]);

  const fetchCourses = async (technology) => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses", {
        params: { technology },
      });
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
      setCourses([]);
    }
  };

  useEffect(() => {
    fetchCourses(selectedTech);
  }, [selectedTech]);

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, p: 3, bgcolor: "white" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", padding: "0.5em" }}
      >
        Popular YouTube Courses
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Technology</InputLabel>
        <Select
          value={selectedTech}
          label="Technology"
          onChange={(e) => setSelectedTech(e.target.value)}
        >
          {technologies.map((tech) => (
            <MenuItem key={tech} value={tech}>
              {tech}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {courses.length === 0 ? (
          <Typography variant="body1" sx={{ ml: 2 }}>
            No courses found for {selectedTech}.
          </Typography>
        ) : (
          courses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%" }}>
                <Link
                  href={`https://www.youtube.com/watch?v=${course.youtubeId}`}
                  target="_blank"
                  rel="noopener"
                  underline="none"
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={`https://img.youtube.com/vi/${course.youtubeId}/hqdefault.jpg`}
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
          ))
        )}
      </Grid>
    </Box>
  );
};

export default CourseList;
