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
import FadeUpOnScroll from "../components/FadeUpOnScroll";

const Status = () => {
  // Simulated service statuses (replace with API call if needed)
  const [services, setServices] = useState([
    { name: "Dashboard", status: "online" },
    { name: "Media Upload", status: "online" },
    { name: "User Authentication", status: "online" },
    { name: "File Storage", status: "offline" },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

        {/* Loading Spinner */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: 4 }} justifyContent="center">
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
                      borderRadius: 3,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                      },
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
