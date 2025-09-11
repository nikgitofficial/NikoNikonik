import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../api/axios";
import React from "react";

const AdminHomePage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalImages: 0,
    totalVideos: 0,
    totalMedia: 0,
    totalMessages: 0, // ✅ add messages count
  });
  const [loading, setLoading] = useState(true);

  // ✅ Dialog states
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [listData, setListData] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  // ✅ Map card types to API endpoints
  const endpoints = {
    Users: "/admin/users",
    Images: "/admin/images",
    Videos: "/admin/videos",
    Media: "/admin/media",
    Messages: "/contact", // ✅ backend contact route
  };

useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await axios.get("/admin/stats");
      const messagesRes = await axios.get("/contact");

      // ✅ Only update stats if data exists
      setStats(prev => ({
        totalUsers: res?.data?.totalUsers ?? prev.totalUsers,
        totalImages: res?.data?.totalImages ?? prev.totalImages,
        totalVideos: res?.data?.totalVideos ?? prev.totalVideos,
        totalMedia: res?.data?.totalMedia ?? prev.totalMedia,
        totalMessages: Array.isArray(messagesRes?.data)
          ? messagesRes.data.length
          : prev.totalMessages,
      }));
    } catch (err) {
      console.error("❌ Failed to fetch stats", err);
      // ❌ Do not reset stats on error
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);


  // ✅ Fetch detailed list when clicking card
  const handleOpen = async (type) => {
    setSelectedType(type);
    setOpen(true);
    setListLoading(true);

    try {
      const endpoint = endpoints[type];
      if (!endpoint) throw new Error(`No endpoint for ${type}`);
      const res = await axios.get(endpoint);
      setListData(res.data);
    } catch (err) {
      console.error(`❌ Failed to fetch ${type}`, err);
      setListData([]);
    } finally {
      setListLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setListData([]);
    setSelectedType(null);
  };

  const renderCard = (title, value, type) => (
    <Card
      sx={{ p: 2, boxShadow: 3, textAlign: "center", cursor: "pointer" }}
      onClick={() => handleOpen(type)}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {loading ? (
          <CircularProgress size={24} />
        ) : (
          <Typography variant="h3" fontWeight="bold">
            {value}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome, Admin 👋
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is your admin homepage. From here you can manage users, settings,
        and monitor system activity.
      </Typography>

      {/* ✅ Stats Grid */}
      <Grid container spacing={3} sx={{ mt: 4, maxWidth: 1000 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          {renderCard("Total Users", stats.totalUsers, "Users")}
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          {renderCard("Total Images", stats.totalImages, "Images")}
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          {renderCard("Total Videos", stats.totalVideos, "Videos")}
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          {renderCard("Total Media", stats.totalMedia, "Media")}
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          {renderCard("Contact Messages", stats.totalMessages, "Messages")}
        </Grid>
      </Grid>

      {/* ✅ Dialog with Table */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          {selectedType ? `All ${selectedType}` : ""}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {listLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {listData.length > 0 &&
                    Object.keys(listData[0]).map((key) => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {listData.map((item, index) => (
                  <TableRow key={index}>
                    {Object.values(item).map((val, i) => (
                      <TableCell key={i}>
                        {typeof val === "object" ? JSON.stringify(val) : val}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminHomePage;
