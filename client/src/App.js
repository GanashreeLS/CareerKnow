import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Quiz from "./components/pages/Quiz";
import Results from "./components/pages/Results";
import Login from "./components/pages/Auth";
import Register from "./components/pages/Register";
import Contact from "./components/pages/Contact";
import Jobs from "./components/pages/Jobs";
import Testimonials from "./components/pages/Testimonials";
import Services from "./components/pages/Services";
import Header from "./components/pages/Header";

import { isLoggedIn } from "./utils/auth";
import Auth from "./components/pages/Auth";

function App() {
  const [auth, setAuth] = useState(false);// boolean true or false

  useEffect(() => {
    setAuth(isLoggedIn());
  }, []);

  return (
    <Router>
      {auth && <Header />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        {auth && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />

            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/testimonials" element={<Testimonials />} />
          </>
        )}
        {!auth && <Route path="*" element={<Auth />} />}
      </Routes>
    </Router>
  );
}

export default App;
