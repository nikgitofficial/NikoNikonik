import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import FadeUpOnScroll from "../components/FadeUpOnScroll";

const Analytics = () => {
  // Sample data
  const mediaTypeData = [
    { name: "Images", value: 120 },
    { name: "Videos", value: 45 },
    { name: "Other Media", value: 30 },
  ];

  const uploadActivityData = [
    { day: "Mon", uploads: 12 },
    { day: "Tue", uploads: 18 },
    { day: "Wed", uploads: 8 },
    { day: "Thu", uploads: 15 },
    { day: "Fri", uploads: 22 },
    { day: "Sat", uploads: 10 },
    { day: "Sun", uploads: 5 },
  ];

  const COLORS = ["#3f51b5", "#f50057", "#4caf50"];

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
            Analytics
          </Typography>
        </FadeUpOnScroll>

        <FadeUpOnScroll>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Visual insights into your media uploads and activity.
          </Typography>
        </FadeUpOnScroll>

        <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
          {/* Media Type Distribution */}
          <Grid item xs={12} sm={6}>
            <FadeUpOnScroll>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Media Type Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={mediaTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {mediaTypeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </FadeUpOnScroll>
          </Grid>

          {/* Upload Activity */}
          <Grid item xs={12} sm={6}>
            <FadeUpOnScroll>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Upload Activity (Weekly)
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={uploadActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="uploads" fill="#3f51b5" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </FadeUpOnScroll>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Analytics;
