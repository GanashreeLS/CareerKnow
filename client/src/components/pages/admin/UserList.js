import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { red, blue } from "@mui/material/colors";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const openEditDialog = (user) => {
    setEditUser(user);
    setOpenEdit(true);
  };

  const handleEditSave = async () => {
    if (!editUser) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${editUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: editUser.firstname,
            lastName: editUser.lastname,
            email: editUser.email,
            role: editUser.role, // optional if you allow editing role
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update user");

      await fetchUsers(); // Refresh list after saving
      setOpenEdit(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getRoleChip = (role) => {
    const color = role === "admin" ? "primary" : "default";
    return (
      <Chip
        label={role.charAt(0).toUpperCase() + role.slice(1)}
        color={color}
        size="small"
      />
    );
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">User List</Typography>
        <TextField
          size="small"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
          }}
        />
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>First Name</strong>
            </TableCell>
            <TableCell>
              <strong>Last Name</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell>
              <strong>Role</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleChip(user.role || "user")}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => openEditDialog(user)}
                    sx={{ color: blue[500] }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user._id)}
                    sx={{ color: red[500] }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            value={editUser?.firstname || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, firstname: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Last Name"
            margin="normal"
            value={editUser?.lastname || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, lastname: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={editUser?.email || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserList;
