import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import FadeUpOnScroll from "../components/FadeUpOnScroll"; // ✅ Added

const CookieSettings = () => {
  const [cookies, setCookies] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Load saved preferences from localStorage
    const saved = JSON.parse(localStorage.getItem("cookiePreferences"));
    if (saved) setCookies(saved);
  }, []);

  const handleChange = (e) => {
    setCookies({ ...cookies, [e.target.name]: e.target.checked });
  };

  const handleSave = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify(cookies));
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="sm">
        {/* Header */}
        <FadeUpOnScroll>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Cookie Settings
          </Typography>
        </FadeUpOnScroll>

        <FadeUpOnScroll>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Customize your cookie preferences for a better experience.
          </Typography>
        </FadeUpOnScroll>

        <FadeUpOnScroll>
          <Divider sx={{ my: 4 }} />
        </FadeUpOnScroll>

        {/* Cookie Toggles */}
        <FadeUpOnScroll>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={cookies.necessary} disabled />}
              label="Necessary Cookies (Always Active)"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={cookies.analytics}
                  onChange={handleChange}
                  name="analytics"
                />
              }
              label="Analytics Cookies"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={cookies.marketing}
                  onChange={handleChange}
                  name="marketing"
                />
              }
              label="Marketing Cookies"
            />
          </FormGroup>
        </FadeUpOnScroll>

        {/* Save Button */}
        <FadeUpOnScroll>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Preferences
            </Button>
          </Box>
        </FadeUpOnScroll>

        {/* Snackbar Notification */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Cookie preferences saved!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CookieSettings;
