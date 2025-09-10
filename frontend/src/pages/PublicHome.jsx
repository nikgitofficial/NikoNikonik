import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { UploadFile, PhotoLibrary, VideoLibrary, Preview } from "@mui/icons-material";
import FadeUpOnScroll from "../components/FadeUpOnScroll"; // ✅ import fade-up wrapper

const PublicHome = () => {
  const features = [
    {
      icon: <UploadFile sx={{ fontSize: 50, color: "#3f51b5" }} />,
      title: "Upload Media",
      description: "Easily upload images, videos, and other media securely to your account.",
      link: "/dashboard",
    },
    {
      icon: <PhotoLibrary sx={{ fontSize: 50, color: "#4caf50" }} />,
      title: "Organize Your Media",
      description: "Categorize, tag, and manage your media library for quick access.",
      link: "/dashboard",
    },
    {
      icon: <VideoLibrary sx={{ fontSize: 50, color: "#f50057" }} />,
      title: "Manage Videos",
      description: "Upload, edit, and securely store your video content in one place.",
      link: "/dashboard",
    },
    {
      icon: <Preview sx={{ fontSize: 50, color: "#ff9800" }} />,
      title: "Preview Files",
      description: "Preview images and videos before sharing or downloading them.",
      link: "/preview",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <FadeUpOnScroll>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
              Welcome to Personal Media Manager
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Upload, organize, and manage your media files securely and efficiently.
            </Typography>
            <Button variant="contained" color="primary" size="large" href="/dashboard">
              Go to Dashboard
            </Button>
          </Box>
        </FadeUpOnScroll>

        {/* Features Section */}
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FadeUpOnScroll>
                <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {feature.description}
                  </Typography>
                  <Button variant="outlined" color="primary" href={feature.link}>
                    Explore
                  </Button>
                </Paper>
              </FadeUpOnScroll>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PublicHome;
