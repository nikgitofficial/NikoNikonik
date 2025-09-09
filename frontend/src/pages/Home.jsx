// frontend/src/pages/Home.jsx
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import api from "../api/axios";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [media, setMedia] = useState([]);

  const [showVideos, setShowVideos] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showMedia, setShowMedia] = useState(false);

  // ✅ Fetch Videos
  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  // ✅ Fetch Images
  const fetchImages = async () => {
    try {
      const res = await api.get("/media/images");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  // ✅ Fetch Media
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

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Home
      </Typography>

      {/* ✅ Media Card */}
      <Tooltip title="Click to view media details" arrow>
        <Card
          onClick={() => setShowMedia(!showMedia)}
          sx={{
            cursor: "pointer",
            maxWidth: 400,
            mb: 3,
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Total Media
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {media.length}
                </Typography>
              </Box>
              {showMedia ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          </CardContent>
        </Card>
      </Tooltip>

      {/* ✅ Expandable Media Table */}
      <Collapse in={showMedia}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date Uploaded</TableCell>
                <TableCell>Preview</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {media.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {item.type === "video" ? (
                      <video src={item.url} width="150" controls />
                    ) : (
                      <img src={item.url} alt={item.title} width="120" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {media.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No media uploaded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>

      {/* ✅ Videos Card */}
      <Tooltip title="Click to view video details" arrow>
        <Card
          onClick={() => setShowVideos(!showVideos)}
          sx={{
            cursor: "pointer",
            maxWidth: 400,
            mb: 3,
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Total Videos
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {videos.length}
                </Typography>
              </Box>
              {showVideos ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          </CardContent>
        </Card>
      </Tooltip>

      {/* ✅ Expandable Video Table */}
      <Collapse in={showVideos}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date Uploaded</TableCell>
                <TableCell>Preview</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video._id}>
                  <TableCell>{video.title}</TableCell>
                  <TableCell>{new Date(video.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <video src={video.url} width="150" controls />
                  </TableCell>
                </TableRow>
              ))}
              {videos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No videos uploaded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>

      {/* ✅ Images Card */}
      <Tooltip title="Click to view image details" arrow>
        <Card
          onClick={() => setShowImages(!showImages)}
          sx={{
            cursor: "pointer",
            maxWidth: 400,
            mb: 3,
            transition: "0.3s",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6" color="text.secondary">
                  Total Images
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {images.length}
                </Typography>
              </Box>
              {showImages ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Box>
          </CardContent>
        </Card>
      </Tooltip>

      {/* ✅ Expandable Image Table */}
      <Collapse in={showImages}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date Uploaded</TableCell>
                <TableCell>Preview</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image._id}>
                  <TableCell>{image.title}</TableCell>
                  <TableCell>{new Date(image.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <img src={image.url} alt={image.title} width="120" />
                  </TableCell>
                </TableRow>
              ))}
              {images.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No images uploaded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  );
};

export default Home;
