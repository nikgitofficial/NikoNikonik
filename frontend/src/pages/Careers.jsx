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
import FadeUpOnScroll from "../components/FadeUpOnScroll"; // ✅ Correct import

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
            Careers at Personal Media Manager
          </Typography>
        </FadeUpOnScroll>

        <FadeUpOnScroll>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Join our growing team and help build a secure and intuitive media management platform.
          </Typography>
        </FadeUpOnScroll>

        {/* Open Positions */}
        <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
          {positions.map((pos, index) => (
            <Grid item xs={12} key={index}>
              <FadeUpOnScroll>
                <Paper elevation={3} sx={{ p: 3 }}>
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
                    sx={{ mt: 2 }}
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
        <Box sx={{ mt: 6 }}>
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
           <Box sx={{ display: "flex", justifyContent: "center" }}>
  <List sx={{ width: "100%", maxWidth: 600 }}>
    <ListItem sx={{ justifyContent: "center", textAlign: "center" }}>
      <ListItemText primary="Flexible remote work schedule" />
    </ListItem>
    <ListItem sx={{ justifyContent: "center", textAlign: "center" }}>
      <ListItemText primary="Opportunities for growth and skill development" />
    </ListItem>
    <ListItem sx={{ justifyContent: "center", textAlign: "center" }}>
      <ListItemText primary="Collaborative and inclusive work environment" />
    </ListItem>
    <ListItem sx={{ justifyContent: "center", textAlign: "center" }}>
      <ListItemText primary="Work on cutting-edge media management technologies" />
    </ListItem>
  </List>
</Box>

          </FadeUpOnScroll>
        </Box>
      </Container>
    </Box>
  );
};

export default Careers;
