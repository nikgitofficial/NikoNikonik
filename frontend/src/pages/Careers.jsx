import React from "react";
import { Box, Container, Typography, Grid, Paper, Button, List, ListItem, ListItemText } from "@mui/material";

const Careers = () => {
  const positions = [
    {
      title: "Frontend Developer",
      location: "Remote",
      description: "Build and maintain our web application using React, MUI, and modern web technologies.",
    },
    {
      title: "Backend Developer",
      location: "Remote",
      description: "Develop and maintain APIs, database models, and handle media uploads securely.",
    },
    {
      title: "UI/UX Designer",
      location: "Remote",
      description: "Design intuitive, modern interfaces and improve user experience across the platform.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Careers at Personal Media Manager
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Join our growing team and help build a secure and intuitive media management platform.
        </Typography>

        {/* Open Positions */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {positions.map((pos, index) => (
            <Grid item xs={12} key={index}>
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
            </Grid>
          ))}
        </Grid>

        {/* Benefits Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            Why Work With Us
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Flexible remote work schedule" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Opportunities for growth and skill development" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Collaborative and inclusive work environment" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Work on cutting-edge media management technologies" />
            </ListItem>
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default Careers;
