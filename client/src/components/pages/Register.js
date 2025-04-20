import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const endpoint = "http://localhost:5000/api/auth/register";
    console.log("Registering:", formData);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      
        setMessage("✅ Registered successfully! You can now log in.");
        
      
    } catch (err) {
      setMessage("❌ " + err.message);
    }
    // Add actual registration logic here
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300, mx: "auto", mt: 5 }}
    >
      <Typography variant="h5" align="center">Register</Typography>
      <TextField label="Name" name="username" value={formData.username} onChange={handleChange} required />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained">Register</Button>
      {message}
    </Box>
  );
}
