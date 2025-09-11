import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { Forum, People, TipsAndUpdates } from "@mui/icons-material";
import FadeUpOnScroll from "../components/FadeUpOnScroll";

const Community = () => {
  const communityFeatures = [
    {
      icon: <Forum sx={{ fontSize: 50, color: "#3f51b5" }} />,
      title: "Discussion Forums",
      description:
        "Engage with other users, ask questions, and share your experiences with media management.",
    },
    {
      icon: <People sx={{ fontSize: 50, color: "#f50057" }} />,
      title: "User Groups",
      description:
        "Join specialized groups to collaborate, learn, and share tips about your media collections.",
    },
    {
      icon: <TipsAndUpdates sx={{ fontSize: 50, color: "#4caf50" }} />,
      title: "Tips & Updates",
      description:
        "Stay updated with the latest features, best practices, and helpful tips for using the platform efficiently.",
    },
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
            Join Our Community
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
            Connect, share, and grow with other users of Personal Media Manager.
          </Typography>
        </FadeUpOnScroll>

        {/* Features Section */}
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {communityFeatures.map((feature, index) => (
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

        {/* Call-to-Action */}
        <FadeUpOnScroll>
          <Box sx={{ textAlign: "center", mt: { xs: 6, md: 8 } }}>
            <Typography variant="h5" gutterBottom>
              Become a part of our growing community today!
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
              Explore Dashboard
            </Button>
          </Box>
        </FadeUpOnScroll>
      </Container>
    </Box>
  );
};

export default Community;
