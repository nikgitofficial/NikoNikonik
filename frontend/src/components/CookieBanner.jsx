import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Slide } from "@mui/material";

const CookieBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setOpen(false);
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "background.paper",
          boxShadow: 3,
          p: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1300,
        }}
      >
        <Typography color="text.primary" sx={{ mb: { xs: 1, sm: 0 } }}>
          We use cookies to improve your experience on our platform. By continuing, you agree to our use of cookies.
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAccept}
            sx={{ mr: 1 }}
          >
            Accept
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleDecline}>
            Decline
          </Button>
        </Box>
      </Box>
    </Slide>
  );
};

export default CookieBanner;
