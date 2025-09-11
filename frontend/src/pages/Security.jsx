import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { Lock, VerifiedUser, Storage } from "@mui/icons-material";
import FadeUpOnScroll from "../components/FadeUpOnScroll";

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

  const tips = [
    "Use a strong, unique password for your account.",
    "Enable two-factor authentication if available.",
    "Be cautious when sharing your media links.",
    "Log out from devices you don’t use regularly.",
    "Report any suspicious activity immediately.",
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: { xs: 6, md: 10 } }}>
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
            sx={{ mb: { xs: 4, md: 6 } }}
          >
            Your security is our top priority. We implement advanced measures to
            protect your data and media files.
          </Typography>
        </FadeUpOnScroll>

        {/* Features Section */}
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {securityFeatures.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <FadeUpOnScroll>
                <Paper
                  elevation={6}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">{feature.description}</Typography>
                </Paper>
              </FadeUpOnScroll>
            </Grid>
          ))}
        </Grid>

        {/* User Tips */}
        <FadeUpOnScroll>
          <Box sx={{ mt: { xs: 6, md: 10 }, textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Tips to Keep Your Account Safe
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {tips.map((tip, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem" }}>
                  {tip}
                </li>
              ))}
            </Box>
          </Box>
        </FadeUpOnScroll>
      </Container>
    </Box>
  );
};

export default Security;
