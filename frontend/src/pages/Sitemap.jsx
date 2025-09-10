import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import FadeUpOnScroll from "../components/FadeUpOnScroll"; // ✅ import fade

const Sitemap = () => {
  const siteSections = [
    {
      title: "Main Pages",
      links: [
        "Home",
        "Dashboard",
        "Login",
        "Register",
        "Forgot Password",
        "Profile",
        "Settings",
      ],
    },
    {
      title: "Resources",
      links: [
        "Docs",
        "Guides",
        "FAQ",
        "All Answers",
        "Blog",
        "Analytics",
        "Preview",
      ],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Community", "Contact"],
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms and Conditions",
        "Cookie Banner",
        "Cookie Settings",
        "Security",
      ],
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="md">
        <FadeUpOnScroll>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Sitemap
          </Typography>
        </FadeUpOnScroll>

        <FadeUpOnScroll>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Navigate through all sections of Personal Media Manager with ease.
          </Typography>
        </FadeUpOnScroll>

        <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
          {siteSections.map((section, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <FadeUpOnScroll>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  {section.title}
                </Typography>
                <List>
                  {section.links.map((link, idx) => (
                    <ListItem key={idx} sx={{ p: 0.5 }}>
                      <ListItemText primary={link} />
                    </ListItem>
                  ))}
                </List>
                {index !== siteSections.length - 1 && <Divider sx={{ mt: 2 }} />}
              </FadeUpOnScroll>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Sitemap;
