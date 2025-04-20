import React from "react";
import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        🏠 Welcome to CarrerKnow
      </Typography>
      <Typography variant="body1">
        Your one-stop destination for career guidance, job listings, and
        professional growth.
      </Typography>
    </Box>
  );
};

export default Home;
