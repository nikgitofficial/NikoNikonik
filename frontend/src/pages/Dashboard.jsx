// frontend/src/pages/Dashboard.jsx
import React, { useContext, useRef, useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Avatar,
  Divider,
  IconButton,
  CircularProgress,
  Snackbar,
  CssBaseline,
} from "@mui/material";
import {
  Home,
  VideoLibrary,
  PermMedia,
  Image,
  Settings,
  Search,
  Logout,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const drawerWidth = 240;

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, setUser } = useContext(AuthContext);

  // ✅ Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Create theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  // ✅ State for profile pic upload
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const fileInputRef = useRef(null);

  // ✅ Handle profile pic change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setUser((prev) => ({ ...prev, profilePic: preview }));

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      setLoading(true);
      const res = await axios.post("/profile/upload-profile-pic", formData);
      setUser((prev) => ({ ...prev, profilePic: res.data.profilePic }));
      setSnackbar({ open: true, message: "Profile picture updated!" });
    } catch (error) {
      console.error("Upload failed", error);
      setSnackbar({ open: true, message: "Upload failed!" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
    } catch (err) {
      console.error("Logout request failed:", err.message);
    }
    logout();
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* ✅ AppBar */}
        <AppBar
  position="fixed"
  sx={{
    width: `calc(100% - ${drawerWidth}px)`,
    ml: `${drawerWidth}px`,
    boxShadow: 1,
    bgcolor: darkMode ? "background.paper" : "white", 
    color: darkMode ? "text.primary" : "text.primary", 
  }}
>
          <Toolbar>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>

            {/* ✅ Dark mode toggle */}
            <IconButton
              color="inherit"
              onClick={() => setDarkMode((prev) => !prev)}
              sx={{ mr: 2 }}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {/* ✅ Clickable Avatar in AppBar */}
            <Box sx={{ position: "relative" }}>
              <input
                ref={fileInputRef}
                hidden
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <IconButton onClick={() => fileInputRef.current.click()}>
                <Avatar
                  src={user?.profilePic || ""}
                  alt="User"
                  sx={{ width: 36, height: 36 }}
                />
                {loading && (
                  <CircularProgress
                    size={36}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      color: "primary.main",
                    }}
                  />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {/* ✅ Sidebar */}
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                pt: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              },
            }}
          >
            <Box>
              {/* ✅ Profile Section inside Drawer */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <input
                    ref={fileInputRef}
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <IconButton onClick={() => fileInputRef.current.click()}>
                    <Avatar
                      src={user?.profilePic || ""}
                      alt="User"
                      sx={{ width: 72, height: 72, mx: "auto" }}
                    />
                    {loading && (
                      <CircularProgress
                        size={72}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          color: "primary.main",
                        }}
                      />
                    )}
                  </IconButton>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mt: 1 }}
                >
                  {user?.username || "User"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Search */}
              <Box sx={{ px: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search here"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Navigation */}
              <List>
                <ListItemButton
                  component={Link}
                  to="/dashboard/home"
                  selected={location.pathname === "/dashboard/home"}
                >
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/dashboard/video-uploader"
                  selected={location.pathname === "/dashboard/video-uploader"}
                >
                  <ListItemIcon>
                    <VideoLibrary />
                  </ListItemIcon>
                  <ListItemText primary="Video Uploader" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/dashboard/media-uploader"
                  selected={location.pathname === "/dashboard/media-uploader"}
                >
                  <ListItemIcon>
                    <PermMedia />
                  </ListItemIcon>
                  <ListItemText primary="Media Uploader" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/dashboard/image-uploader"
                  selected={location.pathname === "/dashboard/image-uploader"}
                >
                  <ListItemIcon>
                    <Image />
                  </ListItemIcon>
                  <ListItemText primary="Image Uploader" />
                </ListItemButton>

                <Divider sx={{ my: 2 }} />

                <ListItemButton
                  component={Link}
                  to="/dashboard/settings"
                  selected={location.pathname === "/dashboard/settings"}
                >
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </List>
            </Box>

            {/* Logout */}
            <Box sx={{ p: 2 }}>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </Box>
          </Drawer>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              minHeight: "100vh",
              mt: 8,
            }}
          >
            <Outlet />
          </Box>
        </Box>

        {/* ✅ Footer */}
        <Box
          component="footer"
          sx={{
            textAlign: "center",
            py: 2,
            mt: "auto",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Personal Record Keeper. All rights reserved.
          </Typography>
        </Box>

        {/* ✅ Snackbar */}
        <Snackbar
          open={snackbar.open}
          onClose={() => setSnackbar({ open: false, message: "" })}
          autoHideDuration={3000}
          message={snackbar.message}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
