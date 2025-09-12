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
import PeopleIcon from "@mui/icons-material/People";
import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MessageIcon from "@mui/icons-material/Message";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import axios from "../api/axios";
import React from "react";

const cardConfig = {
  Users: { icon: <PeopleIcon fontSize="large" />, color: "#4caf50" },
  Images: { icon: <ImageIcon fontSize="large" />, color: "#2196f3" },
  Videos: { icon: <VideoLibraryIcon fontSize="large" />, color: "#ff9800" },
  Media: { icon: <LibraryBooksIcon fontSize="large" />, color: "#9c27b0" },
  Messages: { icon: <MessageIcon fontSize="large" />, color: "#f44336" },
  Subscriptions: { icon: <SubscriptionsIcon fontSize="large" />, color: "#00bcd4" },
};

const AdminHomePage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalImages: 0,
    totalVideos: 0,
    totalMedia: 0,
    totalMessages: 0,
    totalSubscriptions: 0,
  });
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [listData, setListData] = useState([]);
  const [listLoading, setListLoading] = useState(false);

  const endpoints = {
    Users: "/admin/users",
    Images: "/admin/images",
    Videos: "/admin/videos",
    Media: "/admin/media",
    Messages: "/contact",
    Subscriptions: "/subscription",
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [res, messagesRes, subsRes] = await Promise.all([
          axios.get("/admin/stats"),
          axios.get("/contact"),
          axios.get("/subscription"),
        ]);

        setStats(prev => ({
          totalUsers: res?.data?.totalUsers ?? prev.totalUsers,
          totalImages: res?.data?.totalImages ?? prev.totalImages,
          totalVideos: res?.data?.totalVideos ?? prev.totalVideos,
          totalMedia: res?.data?.totalMedia ?? prev.totalMedia,
          totalMessages: Array.isArray(messagesRes?.data)
            ? messagesRes.data.length
            : prev.totalMessages,
          totalSubscriptions: Array.isArray(subsRes?.data)
            ? subsRes.data.length
            : prev.totalSubscriptions,
        }));
      } catch (err) {
        console.error("❌ Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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

  const renderCard = (title, value, type) => {
    const { icon, color } = cardConfig[type] || {};
    return (
      <Card
        sx={{
          p: 2,
          boxShadow: 6,
          textAlign: "center",
          cursor: "pointer",
          borderRadius: 3,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 12,
          },
          background: `linear-gradient(135deg, ${color}33, ${color}99)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onClick={() => handleOpen(type)}
      >
        {icon && (
          <Box sx={{ mb: 1, color: color }}>
            {icon}
          </Box>
        )}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color }}>
          {title}
        </Typography>
        {loading ? (
          <CircularProgress size={28} sx={{ color: color }} />
        ) : (
          <Typography variant="h4" fontWeight="bold" sx={{ color }}>
            {value}
          </Typography>
        )}
      </Card>
    );
  };

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

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mt: 4, maxWidth: 1200 }}>
        {renderCard("Total Users", stats.totalUsers, "Users")}
        {renderCard("Total Images", stats.totalImages, "Images")}
        {renderCard("Total Videos", stats.totalVideos, "Videos")}
        {renderCard("Total Media", stats.totalMedia, "Media")}
        {renderCard("Contact Messages", stats.totalMessages, "Messages")}
        {renderCard("Total Subscriptions", stats.totalSubscriptions, "Subscriptions")}
      </Grid>

      {/* Dialog with Table */}
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
