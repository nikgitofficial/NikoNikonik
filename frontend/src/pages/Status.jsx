import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import FadeUpOnScroll from "../components/FadeUpOnScroll"; // ✅ import fade

const Status = () => {
  // Simulated service statuses (you can later fetch from an API)
  const [services, setServices] = useState([
    { name: "Dashboard", status: "online" },
    { name: "Media Upload", status: "online" },
    { name: "User Authentication", status: "online" },
    { name: "File Storage", status: "offline" },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getChipColor = (status) => {
    switch (status) {
      case "online":
        return "success";
      case "offline":
        return "error";
      case "degraded":
        return "warning";
      default:
        return "default";
    }
  };

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
            System Status
          </Typography>
        </FadeUpOnScroll>

        <FadeUpOnScroll>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Check the current operational status of our services.
          </Typography>
        </FadeUpOnScroll>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <FadeUpOnScroll>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {service.name}
                    </Typography>
                    <Chip
                      label={service.status.toUpperCase()}
                      color={getChipColor(service.status)}
                    />
                  </Paper>
                </FadeUpOnScroll>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Status;
