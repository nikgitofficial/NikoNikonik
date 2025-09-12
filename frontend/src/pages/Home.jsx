// ✅ Modern Responsive Dashboard (Improved UI/UX)
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Grid,
  IconButton,
  Divider,
  Fade,
  TextField,
  useTheme, // ✅ added
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FolderIcon from "@mui/icons-material/Folder";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ImageIcon from "@mui/icons-material/Image";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import api from "../api/axios";

const Home = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [media, setMedia] = useState([]);

  const [showVideos, setShowVideos] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showMedia, setShowMedia] = useState(false);

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await api.get("/media/images");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  const fetchMedia = async () => {
    try {
      const res = await api.get("/media");
      setMedia(res.data);
    } catch (err) {
      console.error("Failed to fetch media:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchImages();
    fetchMedia();
  }, []);

  const cardThemes = {
    media: {
      bg: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      text: "linear-gradient(90deg,#1976d2,#42a5f5)",
      iconBg: "rgba(25,118,210,0.1)",
      iconColor: "#1976d2",
    },
    videos: {
      bg: "linear-gradient(135deg, #fff1f1 0%, #ffe6f0 100%)",
      text: "linear-gradient(90deg,#ff512f,#dd2476)",
      iconBg: "rgba(221,36,118,0.1)",
      iconColor: "#dd2476",
    },
    images: {
      bg: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
      text: "linear-gradient(90deg,#11998e,#38ef7d)",
      iconBg: "rgba(56,239,125,0.1)",
      iconColor: "#38ef7d",
    },
  };

  const StatCard = ({ title, count, expanded, toggleExpand, colors, icon }) => (
    <Tooltip title={`Click to view ${title.toLowerCase()} details`} arrow>
      <Card
        onClick={toggleExpand}
        sx={{
          cursor: "pointer",
          borderRadius: 4,
          backdropFilter: "blur(6px)",
          background: colors.bg,
          boxShadow: expanded ? "0 8px 24px rgba(0,0,0,0.15)" : "0 4px 12px rgba(0,0,0,0.1)",
          transition: "0.3s",
          "&:hover": { boxShadow: "0 12px 28px rgba(0,0,0,0.2)", transform: "translateY(-3px) scale(1.02)" },
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
              >
                {title}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1.6rem", sm: "2rem" },
                  background: colors.text,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {count}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: colors.iconBg,
                color: colors.iconColor,
              }}
            >
              {icon}
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={1}>
            <IconButton size="small" sx={{ color: colors.iconColor }}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  );

  const tableSx = {
    background: isDark ? theme.palette.background.paper : "#fff",
    "& .MuiTableCell-root": { color: theme.palette.text.primary },
    "& .MuiTableRow-root:hover": { backgroundColor: isDark ? "#333" : "#f5f5f5" },
    borderRadius: 3,
    overflow: "hidden",
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        sx={{ fontSize: { xs: "1.6rem", sm: "2.2rem" }, color: "primary.main" }}
      >
        Dashboard Overview
      </Typography>

      {/* ✅ Calendar Section */}
      <Box
        mb={4}
        sx={{
          width: "100%",
          maxWidth: "400px",
          background: isDark ? theme.palette.background.paper : "#fff",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          p: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label=""
            value={selectedDateTime}
            onChange={(newValue) => setSelectedDateTime(newValue)}
            disableFuture
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                sx={{
                  input: { color: theme.palette.text.primary },
                  "& .MuiInputBase-root": { color: theme.palette.text.primary },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: isDark ? "#555" : "#ccc" },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} justifyContent="center" maxWidth="1200px">
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Media"
            count={media.length}
            expanded={showMedia}
            toggleExpand={() => setShowMedia(!showMedia)}
            colors={cardThemes.media}
            icon={<FolderIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Videos"
            count={videos.length}
            expanded={showVideos}
            toggleExpand={() => setShowVideos(!showVideos)}
            colors={cardThemes.videos}
            icon={<VideoLibraryIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Images"
            count={images.length}
            expanded={showImages}
            toggleExpand={() => setShowImages(!showImages)}
            colors={cardThemes.images}
            icon={<ImageIcon />}
          />
        </Grid>
      </Grid>

      {/* Expandable Tables */}
      <Box mt={4} width="100%" maxWidth="1200px">
        {/* Media Table */}
        <Collapse in={showMedia}>
          <Fade in={showMedia}>
            <Box>
              <Divider sx={{ mb: 2, fontWeight: "bold" }}>📂 Media Details</Divider>
              <TableContainer component={Paper} sx={tableSx}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: isDark ? "#222" : "grey.100" }}>
                      <TableCell>Title</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Date Uploaded</TableCell>
                      <TableCell>Preview</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {media.map((item) => (
                      <TableRow key={item._id} hover>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          {item.type === "video" ? (
                            <video src={item.url} width="150" controls style={{ borderRadius: 12 }} />
                          ) : (
                            <img src={item.url} alt={item.title} width="120" style={{ borderRadius: 12 }} />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {media.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ color: "text.secondary" }}>
                          No media uploaded yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Fade>
        </Collapse>

        {/* Videos Table */}
        <Collapse in={showVideos}>
          <Fade in={showVideos}>
            <Box>
              <Divider sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>🎬 Videos</Divider>
              <TableContainer component={Paper} sx={tableSx}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: isDark ? "#222" : "grey.100" }}>
                      <TableCell>Title</TableCell>
                      <TableCell>Date Uploaded</TableCell>
                      <TableCell>Preview</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {videos.map((video) => (
                      <TableRow key={video._id} hover>
                        <TableCell>{video.title}</TableCell>
                        <TableCell>{new Date(video.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <video src={video.url} width="150" controls style={{ borderRadius: 12 }} />
                        </TableCell>
                      </TableRow>
                    ))}
                    {videos.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ color: "text.secondary" }}>
                          No videos uploaded yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Fade>
        </Collapse>

        {/* Images Table */}
        <Collapse in={showImages}>
          <Fade in={showImages}>
            <Box>
              <Divider sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>🖼️ Images</Divider>
              <TableContainer component={Paper} sx={tableSx}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: isDark ? "#222" : "grey.100" }}>
                      <TableCell>Title</TableCell>
                      <TableCell>Date Uploaded</TableCell>
                      <TableCell>Preview</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {images.map((image) => (
                      <TableRow key={image._id} hover>
                        <TableCell>{image.title}</TableCell>
                        <TableCell>{new Date(image.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <img src={image.url} alt={image.title} width="120" style={{ borderRadius: 12 }} />
                        </TableCell>
                      </TableRow>
                    ))}
                    {images.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ color: "text.secondary" }}>
                          No images uploaded yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Fade>
        </Collapse>
      </Box>
    </Box>
  );
};

export default Home;
