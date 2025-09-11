import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Rating,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import axios from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const AdminRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState({ avgRating: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const resRatings = await axios.get("/ratings");
      const resAvg = await axios.get("/rate");
      setRatings(resRatings.data);
      setAverage(resAvg.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  const ratingCounts = [1, 2, 3, 4, 5].map((val) => ({
    name: `${val} Star`,
    value: ratings.filter((r) => r.rating === val).length,
  }));

  const ratingsByDay = ratings.reduce((acc, r) => {
    const date = new Date(r.createdAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const ratingsByDayData = Object.entries(ratingsByDay).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center" textAlign="center">
      <Typography variant="h4" mb={2}>
        User Ratings
      </Typography>

      {/* --- Average Rating Table --- */}
      <Box width="100%" maxWidth={600} mb={4}>
        <Typography variant="h5" mb={2}>
          Average Rating Summary
        </Typography>
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Average Rating</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Ratings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Rating value={average.avgRating} precision={0.1} readOnly />
                </TableCell>
                <TableCell>{average.count}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* --- Individual Ratings Table with Pagination --- */}
      <Box width="100%" maxWidth={900} mb={6}>
        <Typography variant="h5" mb={2}>
          All Ratings
        </Typography>
        <Paper elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "secondary.main" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rating</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date & Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ratings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((r) => (
                  <TableRow key={r._id} hover>
                    <TableCell>
                      <Rating value={r.rating} readOnly />
                    </TableCell>
                    <TableCell>{new Date(r.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={ratings.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 9, 15]}
          />
        </Paper>
      </Box>

      {/* --- Pie Chart --- */}
      <Box mt={6} width="100%" maxWidth={900} height={300}>
        <Typography variant="h5" mb={2}>
          Ratings Distribution
        </Typography>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={ratingCounts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {ratingCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* --- Bar Chart --- */}
      <Box mt={6} width="100%" maxWidth={900} height={300}>
        <Typography variant="h5" mb={2}>
          Ratings by Day
        </Typography>
        <ResponsiveContainer>
          <BarChart data={ratingsByDayData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#FF8C00" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* --- Line Chart --- */}
      <Box mt={6} width="100%" maxWidth={900} height={300}>
        <Typography variant="h5" mb={2}>
          Rating Trend
        </Typography>
        <ResponsiveContainer>
          <LineChart data={ratingsByDayData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#00C49F" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AdminRatings;
