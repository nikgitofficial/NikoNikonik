import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { Description, VideoLibrary, Image } from "@mui/icons-material";

const Docs = () => {
  const docSections = [
    {
      icon: <Description sx={{ fontSize: 50, color: "#3f51b5" }} />,
      title: "Getting Started",
      description: "Learn how to create an account, log in, and navigate your dashboard efficiently.",
      link: "/docs/getting-started",
    },
    {
      icon: <Image sx={{ fontSize: 50, color: "#4caf50" }} />,
      title: "Managing Images",
      description: "Step-by-step instructions on uploading, organizing, and sharing your images.",
      link: "/docs/images",
    },
    {
      icon: <VideoLibrary sx={{ fontSize: 50, color: "#f50057" }} />,
      title: "Managing Videos",
      description: "Guide on uploading, editing, and securely storing videos within the platform.",
      link: "/docs/videos",
    },
    {
      icon: <Description sx={{ fontSize: 50, color: "#ff9800" }} />,
      title: "Managing Media",
      description: "Learn how to upload other types of media files and keep everything organized.",
      link: "/docs/media",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="md" display>
        {/* Header */}
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Documentation
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Access guides, tutorials, and detailed instructions to make the most of Personal Media Manager.
        </Typography>

        {/* Doc Sections */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {docSections.map((doc, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                {doc.icon}
                <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                  {doc.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {doc.description}
                </Typography>
                <Button variant="outlined" color="primary" href={doc.link}>
                  Read More
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Docs;
