import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setFormData({ username: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/"); // Redirect to home
      } else {
        alert(data.message || "Authentication failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          {isRegister ? "Create an Account" : "Login to CarrerKnow"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {isRegister && (
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}

          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            {isRegister ? "Register" : "Login"}
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              component="button"
              variant="body2"
              onClick={toggleMode}
              underline="hover"
            >
              {isRegister ? "Login" : "Register"}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
