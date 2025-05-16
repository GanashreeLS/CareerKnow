import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Recommend from "./components/pages/Recommend";
import Results from "./components/pages/Results";
import Login from "./components/pages/Auth";
import Register from "./components/pages/Register";
import Contact from "./components/pages/Contact";
import Jobs from "./components/pages/Jobs";

import Services from "./components/pages/Services";
import Header from "./components/pages/Header";

import { Paper, Container, Box } from "@mui/material";
import { isLoggedIn, isAdmin, isUser } from "./utils/auth";
import Auth from "./components/pages/Auth";
import ResumeBuilder from "./components/pages/ResumeBuilder";
import InterviewQuestions from "./components/pages/InterviewQuestions";
import CourseList from "./components/pages/CourseList";
import AdminHome from "./components/pages/AdminHome";

function App() {
  const [auth, setAuth] = useState(false); // boolean true or false

  console.log(isAdmin());
  //const navigate = useNavigate();

  useEffect(() => {
    setAuth(isLoggedIn());
  }, []);

  return (
    <Router>
      {auth && isUser() && <Header />}
      <Routes>
        {isAdmin() && <Route path="/admin" element={<AdminHome />} />}
        <Route path="/auth" element={<Auth />} />
        {auth && isUser() && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/recommendation" element={<Recommend />} />
            <Route path="/results" element={<Results />} />

            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/resumebuilder" element={<ResumeBuilder />} />
            <Route path="/interviewfaqs" element={<InterviewQuestions />} />
            <Route path="/courselist" element={<CourseList />} />
            {/* <Route path="/testimonials" element={<Testimonials />} /> */}
          </>
        )}
        {!auth && <Route path="*" element={<Home />} />}
      </Routes>
    </Router>
  );
}

export default App;
