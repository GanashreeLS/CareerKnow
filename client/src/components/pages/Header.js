import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";

//import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { isLoggedIn, logout, isUser, isAdmin } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAuth(isLoggedIn());
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  const handleServicesClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleServicesClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Project Name */}
        <Box>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
            alt="Carrer Caper"
            width="140px"
          />
        </Box>

        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          CAREER CAPER
        </Typography>

        {/* Navigation Tabs */}
        {auth && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>

            {/* Services Dropdown */}
            <Button
              color="inherit"
              // endIcon={<ArrowDropDownIcon />}
              onClick={handleServicesClick}
            >
              Services
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleServicesClose}
            >
              <MenuItem
                component={Link}
                to="/resumebuilder"
                onClick={handleServicesClose}
              >
                Resume Building
              </MenuItem>
              <MenuItem
                component={Link}
                to="/courselist"
                onClick={handleServicesClose}
              >
                Populor Courses
              </MenuItem>
              <MenuItem
                component={Link}
                to="/interviewfaqs"
                onClick={handleServicesClose}
              >
                FAQ Interview Questions
              </MenuItem>
            </Menu>
            {/* 
            <Button component={Link} to="/contact" color="inherit">
              Contact
            </Button> */}
            <Button component={Link} to="/recommendation" color="inherit">
              Recommendation
            </Button>
            {/* <Button component={Link} to="/testimonials" color="inherit">
              Testimonials
            </Button> */}
          </Box>
        )}
        <Box>
          {!auth ? (
            <Button
              component={Link}
              to="/auth"
              color="inherit"
              variant="outlined"
            >
              Login / Register
            </Button>
          ) : (
            <Button onClick={handleLogout} color="inherit" variant="outlined">
              Logout 
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
