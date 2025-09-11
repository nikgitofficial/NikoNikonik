import React, { useContext, useRef, useState, useEffect, useMemo } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
  Avatar,
  Divider,
  IconButton,
  CircularProgress,
  Snackbar,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People,
  Settings,
  Logout,
  Brightness4,
  Brightness7,
  Menu,
  ContactMail,
} from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const drawerWidth = 240;

const AdminPage = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [adminMessage, setAdminMessage] = useState("");
  const [fetching, setFetching] = useState(true);

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: darkMode ? "dark" : "light" },
      }),
    [darkMode]
  );

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // ✅ Fetch admin dashboard data
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get("/admin/dashboard");
        setAdminMessage(res.data.msg);
      } catch (err) {
        setAdminMessage("Access denied.");
      } finally {
        setFetching(false);
      }
    };
    fetchAdmin();
  }, []);

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

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Profile */}
      <Box sx={{ textAlign: "center", mb: 3, px: 2 }}>
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
              alt="Admin"
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
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
          {user?.username || "Admin"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Navigation */}
      <List>
        <ListItemButton
          selected={location.pathname === "/admin/home"}
          onClick={() => navigate("/admin/home")}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          selected={location.pathname === "/admin/users"}
          onClick={() => navigate("/admin/users")}
        >
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Manage Users" />
        </ListItemButton>
          <ListItemButton
    selected={location.pathname === "/admin/contacts"}
    onClick={() => navigate("/admin/contacts")}
  >
    <ListItemIcon>
      <ContactMail />
    </ListItemIcon>
    <ListItemText primary="Contacts" />
  </ListItemButton>
  <ListItemButton
  selected={location.pathname === "/admin/ratings"}
  onClick={() => navigate("/admin/ratings")}
>
  <ListItemIcon>
    <People /> {/* Or use Star icon if you prefer */}
  </ListItemIcon>
  <ListItemText primary="Ratings" />
</ListItemButton>

        <ListItemButton
          selected={location.pathname === "/admin/settings"} // ✅ fixed
          onClick={() => navigate("/admin/settings")}       // ✅ fixed
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>

      {/* Logout */}
      <Box sx={{ p: 2, mt: "auto" }}>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <Logout color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        {/* AppBar */}
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            boxShadow: 1,
            bgcolor: darkMode ? "background.paper" : "white",
            color: darkMode ? "text.primary" : "text.primary",
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
            )}
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>

            <IconButton
              color="inherit"
              onClick={() => setDarkMode((prev) => !prev)}
              sx={{ mr: 2 }}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

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
                  alt="Admin"
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

        {/* Main Layout */}
        <Box sx={{ display: "flex", flexGrow: 1, mt: 8 }}>
          {/* Drawer */}
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                pt: 2,
              },
            }}
          >
            {drawerContent}
          </Drawer>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              minHeight: "100vh",
            }}
          >
            {fetching ? <CircularProgress /> : <Outlet />} 
          </Box>
        </Box>

        {/* Footer */}
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
            © {new Date().getFullYear()} Niko MP. All rights reserved.
          </Typography>
        </Box>

        {/* Snackbar */}
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

export default AdminPage;
