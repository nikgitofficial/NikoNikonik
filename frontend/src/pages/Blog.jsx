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
            Blog
          </Typography>
        </FadeUpOnScroll>

        <FadeUpOnScroll>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Stay up-to-date with the latest news, tips, and tutorials from Personal Media Manager.
          </Typography>
        </FadeUpOnScroll>

        {/* Blog Grid */}
        <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
          {blogPosts.map((post, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <FadeUpOnScroll>
                <Card elevation={3}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {post.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                      {post.date}
                    </Typography>
                    <Typography color="text.secondary">{post.summary}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href={post.link}>
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
