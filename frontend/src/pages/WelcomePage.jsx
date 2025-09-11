import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { UploadFile, PhotoLibrary, VideoLibrary, Preview } from "@mui/icons-material";
import FadeUpOnScroll from "../components/FadeUpOnScroll";

const WelcomePage = () => {
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
    <Box sx={{ bgcolor: "#f9fafb", py: { xs: 6, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <FadeUpOnScroll>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 } }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              Welcome to Personal Media Manager
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 3 }}>
              Upload, organize, and manage your media files securely and efficiently.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="/dashboard"
              sx={{
                py: 1.5,
                px: 5,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": { transform: "scale(1.05)" },
                transition: "all 0.3s ease",
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </FadeUpOnScroll>

        {/* Features Section */}
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FadeUpOnScroll>
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 3,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    paragraph
                    sx={{ textAlign: "center", flexGrow: 1 }}
                  >
                    {feature.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={feature.link}
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: 2,
                      px: 3,
                      py: 1.2,
                      "&:hover": { backgroundColor: "#e3f2fd", borderColor: "#1976d2" },
                    }}
                  >
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

export default WelcomePage;
