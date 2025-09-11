import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import FadeUpOnScroll from "../components/FadeUpOnScroll";

const Blog = () => {
  const blogPosts = [
    {
      title: "How to Optimize Your Media Library",
      date: "September 10, 2025",
      summary:
        "Learn best practices for organizing and managing your images, videos, and other media files for maximum efficiency.",
      link: "/blog/optimize-media-library",
    },
    {
      title: "Top 5 Tips for Secure Media Uploads",
      date: "August 25, 2025",
      summary:
        "Discover essential security tips to keep your media files safe while using Personal Media Manager.",
      link: "/blog/secure-media-uploads",
    },
    {
      title: "New Features in Personal Media Manager",
      date: "July 30, 2025",
      summary:
        "Explore the latest features and updates that improve your media management experience.",
      link: "/blog/new-features",
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
            Blog
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
            Stay up-to-date with the latest news, tips, and tutorials from Personal Media Manager.
          </Typography>
        </FadeUpOnScroll>

        {/* Blog Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {blogPosts.map((post, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <FadeUpOnScroll>
                <Card
                  elevation={6}
                  sx={{
                    borderRadius: 3,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                      {post.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                      {post.date}
                    </Typography>
                    <Typography color="text.secondary">{post.summary}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      href={post.link}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "#e3f2fd" },
                      }}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </FadeUpOnScroll>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
