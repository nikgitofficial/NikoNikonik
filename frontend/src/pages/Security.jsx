import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { Lock, VerifiedUser, Storage } from "@mui/icons-material";
import FadeUpOnScroll from "../components/FadeUpOnScroll"; // ✅ Added

const Security = () => {
  const securityFeatures = [
    {
      icon: <Lock sx={{ fontSize: 50, color: "#f44336" }} />,
      title: "Secure Accounts",
      description:
        "We use strong authentication and encrypted passwords to protect your account from unauthorized access.",
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 50, color: "#3f51b5" }} />,
      title: "Verified Access",
      description:
        "All uploads are verified and securely processed to ensure integrity and safety of your media files.",
    },
    {
      icon: <Storage sx={{ fontSize: 50, color: "#4caf50" }} />,
      title: "Data Encryption",
      description:
        "Media files and personal data are encrypted both in transit and at rest to prevent unauthorized access.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="md">
        {/* Header */}
        <FadeUpOnScroll>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Security
          </Typography>
        </FadeUpOnScroll>

        <FadeUpOnScroll>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Your security is our top priority. We implement advanced measures to
            protect your data and media files.
          </Typography>
        </FadeUpOnScroll>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
          {securityFeatures.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <FadeUpOnScroll>
                <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                  {feature.icon}
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontWeight: "bold" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </FadeUpOnScroll>
            </Grid>
          ))}
        </Grid>

        {/* User Tips */}
        <FadeUpOnScroll>
  <Box sx={{ mt: 6, textAlign: "center" }}>
    <Typography
      variant="h5"
      sx={{ fontWeight: "bold", mb: 2 }}
    >
      Tips to Keep Your Account Safe
    </Typography>
    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
      <li>Use a strong, unique password for your account.</li>
      <li>Enable two-factor authentication if available.</li>
      <li>Be cautious when sharing your media links.</li>
      <li>Log out from devices you don’t use regularly.</li>
      <li>Report any suspicious activity immediately.</li>
    </Box>
  </Box>
</FadeUpOnScroll>

      </Container>
    </Box>
  );
};

export default Security;
