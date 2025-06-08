import React, { useState, useContext } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Auth = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const [isRegister, setIsRegister] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData((prev) => ({ ...prev, email }));

    if (!email) {
      setEmailError(true);
      setEmailHelper("Email is required");
    } else if (!isValidEmail(email)) {
      setEmailError(true);
      setEmailHelper("Enter a valid email (e.g. user@gmail.com)");
    } else {
      setEmailError(false);
      setEmailHelper("");
    }

    // Clear global error if all fields are valid
    if (isFormValid()) setFormErrorMessage("");
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const commonDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
    ];

    if (!emailRegex.test(email)) return false;

    const domain = email.split("@")[1];
    return commonDomains.includes(domain.toLowerCase());
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
    setFormErrorMessage(""); // Clear error message on toggle
  };

  const handleDialogClose = () => {
    setSuccessDialogOpen(false);
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      if (!passwordRegex.test(value)) {
        setPasswordError(true);
        setHelperText("Min 8 chars with upper, lower, number & special char");
      } else {
        setPasswordError(false);
        setHelperText("");
      }
    }

    // Clear global error if all fields are valid
    if (isFormValid()) setFormErrorMessage("");
  };

  const isFormValid = () => {
    return (
      formData.firstname.trim() &&
      formData.lastname.trim() &&
      isValidEmail(formData.email) &&
      passwordRegex.test(formData.password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    // Reset form-level error message
    setFormErrorMessage("");

    // Validate required fields manually
    if (
      isRegister &&
      (!formData.firstname.trim() || !formData.lastname.trim())
    ) {
      hasError = true;
    }

    if (!formData.email.trim()) {
      setEmailError(true);
      setEmailHelper("Email is required");
      hasError = true;
    } else if (!isValidEmail(formData.email)) {
      setEmailError(true);
      setEmailHelper("Enter a valid email (e.g. user@gmail.com)");
      hasError = true;
    } else {
      setEmailError(false);
      setEmailHelper("");
    }

    if (!formData.password || !passwordRegex.test(formData.password)) {
      setPasswordError(true);
      setHelperText("Min 8 chars with upper, lower, number & special char");
      hasError = true;
    } else {
      setPasswordError(false);
      setHelperText("");
    }

    if (hasError) {
      setFormErrorMessage("Please fix all the errors before submitting.");
      return;
    }

    // No errors — submit to API
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
        localStorage.setItem("role", data.role);
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate(data.role === "admin" ? "/admin" : "/");
      } else {
        if (isRegister) {
          setSuccessDialogOpen(true);
        } else {
          alert(data.message || "Authentication failed.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };
  const isValid = (text) => /^[A-Za-z ]+$/.test(text);

  return (
    <Box
      sx={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/banner_2.jpg)`,
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Container maxWidth="sm" sx={{ padding: 20 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            {isRegister ? "Create an Account" : "Login to Career Caper"}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {isRegister && (
              <>
                <TextField
                  margin="normal"
                  fullWidth
                  label="First Name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  error={
                    formData.firstname !== "" && !isValid(formData.firstname)
                  }
                  helperText={
                    formData.firstname !== "" && !isValid(formData.firstname)
                      ? "Only alphabets are allowed"
                      : ""
                  }
                  required
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Last Name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  error={
                    formData.lastname !== "" && !isValid(formData.lastname)
                  }
                  helperText={
                    formData.lastname !== "" && !isValid(formData.lastname)
                      ? "Only alphabets are allowed"
                      : ""
                  }
                  required
                />
              </>
            )}

            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailHelper}
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
              error={passwordError}
              helperText={helperText}
            />

            {formErrorMessage && (
              <Typography
                color="error"
                variant="body2"
                sx={{ mt: 1 }}
                align="center"
              >
                {formErrorMessage}
              </Typography>
            )}

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              {isRegister ? "Register" : "Login"}
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
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

        <Dialog open={successDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Registration Successful</DialogTitle>
          <DialogContent>
            <Typography>
              Thank you for registering! Redirecting to login page...
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} autoFocus>
              Go to Login
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Auth;
