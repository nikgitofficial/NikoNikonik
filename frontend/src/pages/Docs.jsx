import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { Description, VideoLibrary, Image } from "@mui/icons-material";
import FadeUpOnScroll from "../components/FadeUpOnScroll";

const Docs = () => {
  const docSections = [
    {
      icon: <Description sx={{ fontSize: 50, color: "#3f51b5" }} />,
      title: "Getting Started",
      description:
        "Learn how to create an account, log in, and navigate your dashboard efficiently.",
      link: "/docs/getting-started",
    },
    {
      icon: <Image sx={{ fontSize: 50, color: "#4caf50" }} />,
      title: "Managing Images",
      description:
        "Step-by-step instructions on uploading, organizing, and sharing your images.",
      link: "/docs/images",
    },
    {
      icon: <VideoLibrary sx={{ fontSize: 50, color: "#f50057" }} />,
      title: "Managing Videos",
      description:
        "Guide on uploading, editing, and securely storing videos within the platform.",
      link: "/docs/videos",
    },
    {
      icon: <Description sx={{ fontSize: 50, color: "#ff9800" }} />,
      title: "Managing Media",
      description:
        "Learn how to upload other types of media files and keep everything organized.",
      link: "/docs/media",
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
            Documentation
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
            Access guides, tutorials, and detailed instructions to make the most
            of Personal Media Manager.
          </Typography>
        </FadeUpOnScroll>

        {/* Doc Sections */}
        <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {docSections.map((doc, index) => (
            <Grid item xs={12} sm={6} key={index}>
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
                  <Box sx={{ mb: 2 }}>{doc.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}
                  >
                    {doc.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    paragraph
                    sx={{ textAlign: "center", flexGrow: 1 }}
                  >
                    {doc.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={doc.link}
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: 2,
                      px: 3,
                      py: 1.2,
                      "&:hover": {
                        backgroundColor: "#e3f2fd",
                        borderColor: "#1976d2",
                      },
                    }}
                  >
                    Read More
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

export default Docs;
