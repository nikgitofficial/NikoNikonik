import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItemButton, ListItemText, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// ✅ Import local logo
import Logo from '../assets/logo.png'; // adjust path if Navbar.jsx is in another folder

const Navbar = () => {
  const appPages = ['PublicHome', 'Login', 'Register'];
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      {/* Sticky Navbar */}
      <AppBar
        position="fixed"
        color="primary"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, px: { xs: 2, sm: 4, md: 6 } }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ height: 40, mr: 2 }}
            />
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              Niko Nikonik
            </Typography>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {appPages.map((page) => (
              <Button
                key={page}
                color="inherit"
                href={`/${page}`}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 1,
                  }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Add spacing so content isn't hidden behind fixed navbar */}
      <Toolbar />

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {appPages.map((page) => (
              <ListItemButton key={page} component="a" href={`/${page}`}>
                <ListItemText primary={page} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
