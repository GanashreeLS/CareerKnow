import React, { useEffect } from "react";
import { Typography, Box, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, [navigate]);

  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      bannerImage: `${process.env.PUBLIC_URL}/images/banner_1.jpg`,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      bannerImage: `${process.env.PUBLIC_URL}/images/banner_2.jpg`,
    },
    {
      name: "Random Name #3",
      description: "Another banner here!",
      bannerImage: `${process.env.PUBLIC_URL}/images/banner_3.jpg`,
    },
    {
      name: "Random Name #4",
      description: "Another banner here!",
      bannerImage: `${process.env.PUBLIC_URL}/images/banner_4.jpg`,
    },
  ];
  return (
    <Box
      sx={{ padding: 4, textAlign: "center", width: "80em", margin: "0 auto" }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Carrer Caper
      </Typography>
      <Typography variant="body1">
        Your one-stop destination for career guidance, job listings, and
        professional growth.
      </Typography>
      <Carousel autoPlay interval={2000} animation="slide" indicators={true}>
        {items.map((item, index) => (
          <Paper
            key={index}
            style={{ textAlign: "center", padding: "10px" }}
            variant="outlined"
          >
            <img
              src={item.bannerImage}
              alt={item.name}
              style={{ width: "100%", height: "auto" }}
            />
          </Paper>
        ))}
      </Carousel>
      <Box>
        <Typography variant="h4">About Career Caper</Typography>
        <Typography variant="p">
          Education seekers get a personalised experience on our site, based on
          educational background and career interest, enabling them to make well
          informed course and career decisions. The decision making is empowered
          with easy access to detailed information on career choices, courses,
          exams, colleges, admission criteria, eligibility, placement
          statistics, rankings, reviews, scholarships, latest updates etc as
          well as by interacting with other career.ly users, experts, current
          students in colleges and alumni groups. We have introduced several
          student oriented products and tools like Career Prediction, Knowledge
          Network, Daily Bytes, Blogs, Community discussion forum, and various
          Courses.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
