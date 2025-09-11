import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { Image, VideoLibrary, PermMedia } from "@mui/icons-material";
import FadeUpOnScroll from "../components/FadeUpOnScroll";

const About = () => {
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
            About Personal Media Manager
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
            Personal Media Manager is a secure platform that allows you to upload,
            manage, and organize all your media files in one place.
          </Typography>
        </FadeUpOnScroll>

        {/* Features Section */}
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {[
            {
              icon: <Image sx={{ fontSize: 50, color: "#3f51b5" }} />,
              title: "Upload Images",
              description:
                "Easily upload your favorite images and access them anytime, anywhere.",
            },
            {
              icon: <VideoLibrary sx={{ fontSize: 50, color: "#f50057" }} />,
              title: "Upload Videos",
              description:
                "Store and manage your videos securely in your personal dashboard.",
            },
            {
              icon: <PermMedia sx={{ fontSize: 50, color: "#4caf50" }} />,
              title: "Upload Media",
              description:
                "Upload documents, audio, and other media files with ease and security.",
            },
          ].map((feature, index) => (
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

        {/* Call to Action */}
        <FadeUpOnScroll>
          <Box sx={{ textAlign: "center", mt: { xs: 4, md: 6 } }}>
            <Typography variant="h5" gutterBottom>
              Ready to get started?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/dashboard"
              sx={{
                mt: 2,
                py: 1.5,
                px: 4,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </FadeUpOnScroll>
      </Container>
    </Box>
  );
};

export default About;
