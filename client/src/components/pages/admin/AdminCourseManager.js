import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";

const AdminCourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [technology, setTechnology] = useState("Java");
  const [newCourse, setNewCourse] = useState({ title: "", youtubeId: "" });

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses", {
      params: { technology },
    });
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, [technology]);

  const handleAddCourse = async () => {
    if (!newCourse.title || !newCourse.youtubeId || !technology) return;

    await axios.post("http://localhost:5000/api/courses", {
      ...newCourse,
      technology,
    });
    setNewCourse({ title: "", youtubeId: "" });
    fetchCourses();
  };

  const handleDeleteCourse = async (id) => {
    await axios.delete(`http://localhost:5000/api/courses/${id}`);
    fetchCourses();
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 3, bgcolor: "white" }}>
      <Typography variant="h5" mb={2}>
        Admin Course Manager
      </Typography>

      <Select
        value={technology}
        onChange={(e) => setTechnology(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {["Java", "React", "MongoDB", "PHP"].map((tech) => (
          <MenuItem key={tech} value={tech}>
            {tech}
          </MenuItem>
        ))}
      </Select>

      <TextField
        label="Course Title"
        fullWidth
        sx={{ mb: 2 }}
        value={newCourse.title}
        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
      />
      <TextField
        label="YouTube Video ID"
        fullWidth
        sx={{ mb: 2 }}
        value={newCourse.youtubeId}
        onChange={(e) =>
          setNewCourse({ ...newCourse, youtubeId: e.target.value })
        }
      />
      <Button variant="contained" onClick={handleAddCourse}>
        Add Course
      </Button>

      <Typography variant="h6" mt={4}>
        Existing Courses
      </Typography>
      <Grid container spacing={2} mt={1}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">{course.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {course.youtubeId}
                </Typography>
                <IconButton
                  onClick={() => handleDeleteCourse(course._id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminCourseManager;
