import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import FadeUpOnScroll from "../components/FadeUpOnScroll";

const Careers = () => {
  const positions = [
    {
      title: "Frontend Developer",
      location: "Remote",
      description:
        "Build and maintain our web application using React, MUI, and modern web technologies.",
    },
    {
      title: "Backend Developer",
      location: "Remote",
      description:
        "Develop and maintain APIs, database models, and handle media uploads securely.",
    },
    {
      title: "UI/UX Designer",
      location: "Remote",
      description:
        "Design intuitive, modern interfaces and improve user experience across the platform.",
    },
  ];

  const benefits = [
    "Flexible remote work schedule",
    "Opportunities for growth and skill development",
    "Collaborative and inclusive work environment",
    "Work on cutting-edge media management technologies",
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
            Careers at Personal Media Manager
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
            Join our growing team and help build a secure and intuitive media management platform.
          </Typography>
        </FadeUpOnScroll>

        {/* Open Positions */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {positions.map((pos, index) => (
            <Grid item xs={12} key={index}>
              <FadeUpOnScroll>
                <Paper
                  elevation={6}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {pos.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {pos.location}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>{pos.description}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 2,
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 500,
                      "&:hover": { backgroundColor: "#1565c0" },
                    }}
                    href="mailto:careers@personalmediamanager.com"
                  >
                    Apply Now
                  </Button>
                </Paper>
              </FadeUpOnScroll>
            </Grid>
          ))}
        </Grid>

        {/* Benefits Section */}
        <Box sx={{ mt: { xs: 6, md: 10 } }}>
          <FadeUpOnScroll>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Why Work With Us
            </Typography>
          </FadeUpOnScroll>

          <FadeUpOnScroll>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <List sx={{ width: "100%", maxWidth: 600 }}>
                {benefits.map((benefit, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      justifyContent: "center",
                      textAlign: "center",
                      py: 1,
                    }}
                  >
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </FadeUpOnScroll>
        </Box>
      </Container>
    </Box>
  );
};

export default Careers;
