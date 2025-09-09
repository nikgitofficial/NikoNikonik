import React, { useContext } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"; // ✅ import Navbar
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // ❌ Pages where footer should be hidden
  const hiddenFooterRoutes = [
    "/dashboard/home",
    "/dashboard/video-uploader",
    "/dashboard/media-uploader",
    "/dashboard/image-uploader",
    "/dashboard/settings",
  ];

  // Check if the current route is in the hidden list
  const shouldHideFooter = hiddenFooterRoutes.includes(location.pathname);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar /> {/* ✅ Added Navbar */}

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>

      {/* Footer (conditionally rendered) */}
      {!shouldHideFooter && <Footer />}
    </Box>
  );
};

export default Layout;
