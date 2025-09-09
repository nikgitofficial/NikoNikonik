import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { UploadFile, PhotoLibrary, VideoLibrary, HelpOutline } from "@mui/icons-material";

const Guides = () => {
  const guides = [
    {
      icon: <UploadFile sx={{ fontSize: 50, color: "#3f51b5" }} />,
      title: "Upload Media",
      description: "Learn how to upload images, videos, and other files securely to your account.",
      link: "/guides/upload-media",
    },
    {
      icon: <PhotoLibrary sx={{ fontSize: 50, color: "#4caf50" }} />,
      title: "Organize Your Images",
      description: "Step-by-step guide to categorize, tag, and manage your image library.",
      link: "/guides/images",
    },
    {
      icon: <VideoLibrary sx={{ fontSize: 50, color: "#f50057" }} />,
      title: "Manage Videos",
      description: "Learn how to upload, edit, and securely store your video content.",
      link: "/guides/videos",
    },
    {
      icon: <HelpOutline sx={{ fontSize: 50, color: "#ff9800" }} />,
      title: "Advanced Tips",
      description: "Discover advanced tips and tricks to make the most of your media management platform.",
      link: "/guides/advanced-tips",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Guides
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Step-by-step tutorials to help you navigate and use Personal Media Manager effectively.
        </Typography>

        {/* Guides Section */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {guides.map((guide, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                {guide.icon}
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  {guide.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {guide.description}
                </Typography>
                <Button variant="outlined" color="primary" href={guide.link}>
                  Read Guide
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Guides;
