import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import AddFaq from "./AddFaq";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../utils/auth";
import UserList from "./UserList";
import AdminCourseManager from "./AdminCourseManager";
export default function AdminHome() {
  const [view, setView] = useState("home");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Box>
            <img
              src={`${process.env.PUBLIC_URL}/images/logo.jpg`}
              alt="Carrer Caper"
              width="140px"
            />
          </Box>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button color="inherit" onClick={() => setView("home")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => setView("add-faq")}>
            Add FAQs
          </Button>
          <Button color="inherit" onClick={() => setView("manage-courses")}>
            Manage Courses
          </Button>
          <Button color="inherit" onClick={() => setView("user-list")}>
            Manage Users
          </Button>
          <Button onClick={handleLogout} color="inherit" variant="outlined">
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box p={3} maxWidth="800px" mx="auto">
        {view === "home" && (
          <Typography variant="h4" mt={3} textAlign="center">
            Welcome to Admin Dashboard
          </Typography>
        )}

        {view === "add-faq" && <AddFaq />}

        {view === "user-list" && <UserList />}

        {view === "manage-courses" && <AdminCourseManager />}
      </Box>
    </Box>
  );
}
