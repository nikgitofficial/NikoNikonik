import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { Image, VideoLibrary, PermMedia } from "@mui/icons-material";

const About = () => {
  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          About Personal Media Manager
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Personal Media Manager is a secure platform that allows you to upload, manage, and organize all your media files in one place.
        </Typography>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <Image sx={{ fontSize: 50, color: "#3f51b5" }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Upload Images
              </Typography>
              <Typography color="text.secondary">
                Easily upload your favorite images and access them anytime, anywhere.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <VideoLibrary sx={{ fontSize: 50, color: "#f50057" }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Upload Videos
              </Typography>
              <Typography color="text.secondary">
                Store and manage your videos securely in your personal dashboard.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
              <PermMedia sx={{ fontSize: 50, color: "#4caf50" }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Upload Media
              </Typography>
              <Typography color="text.secondary">
                Upload documents, audio, and other media files with ease and security.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Ready to get started?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/dashboard"
            sx={{ mt: 2 }}
          >
            Go to Dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
