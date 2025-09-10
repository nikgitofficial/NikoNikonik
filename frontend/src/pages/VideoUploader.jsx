// ✅ Video Manager with Edit/Delete/Download + Per-file Progress + Cancel Uploads
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../api/axios";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Divider,
  CircularProgress,
  Tooltip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const VideoUploader = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null, videoId: null });
  
  // ✅ New state for Edit Modal
  const [editDialog, setEditDialog] = useState({ open: false, videoId: null, title: "" });

  // ✅ New state for per-file progress
  const [fileStatus, setFileStatus] = useState({});

  // ✅ Cancel tokens for all uploads
  const cancelTokens = useRef([]);

  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
      setSnackbar({ open: true, message: "Failed to fetch videos.", severity: "error" });
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    const initialStatus = {};
    Array.from(e.target.files).forEach((file) => {
      initialStatus[file.name] = { progress: 0, done: false, canceled: false };
    });
    setFileStatus(initialStatus);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    try {
      setLoading(true);
      cancelTokens.current = [];

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("video", file);
        formData.append("title", file.name);

        const cancelSource = axios.CancelToken.source();
        cancelTokens.current.push(cancelSource);

        await api.post("/videos/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          cancelToken: cancelSource.token,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setFileStatus((prev) => ({
              ...prev,
              [file.name]: { ...prev[file.name], progress: percent, done: percent === 100 },
            }));
          },
        });
      }

      fetchVideos();
      setSnackbar({ open: true, message: "Videos uploaded successfully!", severity: "success" });
    } catch (err) {
      if (axios.isCancel(err)) {
        setSnackbar({ open: true, message: "Upload canceled.", severity: "warning" });
      } else {
        console.error("Upload failed:", err);
        setSnackbar({ open: true, message: "Upload failed.", severity: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel all uploads
  const handleCancelAll = () => {
    cancelTokens.current.forEach((c) => c.cancel("User canceled upload."));
    cancelTokens.current = [];
    setLoading(false);

    // Mark all selected files as canceled
    setFileStatus((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((file) => {
        if (!updated[file].done) {
          updated[file] = { ...updated[file], canceled: true };
        }
      });
      return updated;
    });
  };

  const handleDelete = async (id) => {
    try {
      setActionLoading(id);
      await api.delete(`/videos/${id}`);
      fetchVideos();
      setSnackbar({ open: true, message: "Video deleted successfully!", severity: "success" });
    } catch (err) {
      console.error("Delete failed:", err);
      setSnackbar({ open: true, message: "Delete failed.", severity: "error" });
    } finally {
      setActionLoading(null);
      setConfirmDialog({ open: false, action: null, videoId: null });
    }
  };

  // ✅ Open Edit Dialog
  const handleEdit = (id, currentTitle) => {
    setEditDialog({ open: true, videoId: id, title: currentTitle });
  };

  // ✅ Save edit via modal
  const handleSaveEdit = async () => {
    try {
      setActionLoading(editDialog.videoId);
      await api.put(`/videos/${editDialog.videoId}`, { title: editDialog.title });
      setEditDialog({ open: false, videoId: null, title: "" });
      fetchVideos();
      setSnackbar({ open: true, message: "Video updated successfully!", severity: "success" });
    } catch (err) {
      console.error("Edit failed:", err);
      setSnackbar({ open: true, message: "Edit failed.", severity: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/videos/download/${id}`);
      window.open(res.request.responseURL, "_blank");
      setSnackbar({ open: true, message: "Download started.", severity: "info" });
    } catch (err) {
      console.error("Download failed:", err);
      setSnackbar({ open: true, message: "Download failed.", severity: "error" });
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* ✅ Back Link */}
      <Typography
        onClick={() => navigate(-1)}
        sx={{
          color: "primary.main",
          cursor: "pointer",
          textDecoration: "underline",
          mb: { xs: 1.5, sm: 2 },
          alignSelf: "flex-start",
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        ← Back
      </Typography>

      {/* Page Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        mb={{ xs: 2, sm: 3 }}
        fontSize={{ xs: "1.5rem", sm: "2rem" }}
      >
        Upload Videos
      </Typography>

      {/* Upload Form */}
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleFileChange}
            required
            style={{ width: "100%", marginBottom: "8px" }}
          />
          <Box
            mt={2}
            display="flex"
            alignItems="center"
            gap={2}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Tooltip title="Upload selected videos">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth={{ xs: true, sm: false }}
              >
                {loading ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <CircularProgress size={20} color="inherit" />
                    Uploading...
                  </Box>
                ) : (
                  "Upload"
                )}
              </Button>
            </Tooltip>

            {loading && (
              <Tooltip title="Cancel all uploads">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCancelAll}
                  fullWidth={{ xs: true, sm: false }}
                >
                  Cancel Uploads
                </Button>
              </Tooltip>
            )}
          </Box>
        </form>

        {selectedFiles.length > 0 && (
          <Box mt={2}>
            <Typography fontWeight="bold" fontSize={{ xs: "0.9rem", sm: "1rem" }}>
              Selected Files:
            </Typography>
            <ul style={{ paddingLeft: "20px", fontSize: "0.85rem" }}>
              {selectedFiles.map((file, i) => {
                const status = fileStatus[file.name] || { progress: 0, done: false, canceled: false };
                return (
                  <li key={i}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>{file.name}</Typography>
                      {status.canceled ? (
                        <Typography variant="caption" color="error">Canceled</Typography>
                      ) : status.done ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <Typography variant="caption">{status.progress}%</Typography>
                      )}
                    </Box>
                    {!status.done && !status.canceled && status.progress > 0 && (
                      <LinearProgress
                        variant="determinate"
                        value={status.progress}
                        sx={{ width: "100%", mt: 0.5, borderRadius: 1 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </Box>
        )}
      </Paper>

      {/* Videos List */}
      <Box mt={4} width="100%" maxWidth="800px">
        <Typography variant="h5" mb={2} fontSize={{ xs: "1.2rem", sm: "1.5rem" }}>
          Your Videos
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {videos.map((vid) => (
          <Paper
            key={vid._id}
            sx={{
              p: { xs: 1.5, sm: 2 },
              mb: 2,
              borderRadius: 2,
            }}
            elevation={2}
          >
            <Typography fontWeight="bold" fontSize={{ xs: "1rem", sm: "1.1rem" }}>
              {vid.title}
            </Typography>
            <video
              src={vid.url}
              controls
              width="100%"
              style={{
                borderRadius: "8px",
                marginTop: "8px",
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
            <Box
              mt={1}
              display="flex"
              gap={1}
              flexWrap="wrap"
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Tooltip title="Edit title">
                <Button
                  size="small"
                  onClick={() => handleEdit(vid._id, vid.title)}
                  disabled={actionLoading === vid._id}
                >
                  Edit
                </Button>
              </Tooltip>
              <Tooltip title="Download video">
                <Button
                  size="small"
                  onClick={() => handleDownload(vid._id)}
                  disabled={actionLoading === vid._id}
                >
                  Download
                </Button>
              </Tooltip>
              <Tooltip title="Delete video">
                <span>
                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      setConfirmDialog({ open: true, action: "delete", videoId: vid._id })
                    }
                    disabled={actionLoading === vid._id}
                    sx={{
                      borderRadius: actionLoading === vid._id ? "50%" : "4px",
                      minWidth: actionLoading === vid._id ? "40px" : "64px",
                      width: actionLoading === vid._id ? "40px" : "auto",
                      height: actionLoading === vid._id ? "40px" : "auto",
                      p: actionLoading === vid._id ? 0 : "6px 16px",
                    }}
                  >
                    {actionLoading === vid._id ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Paper>
        ))}

        {videos.length === 0 && (
          <Typography align="center" color="text.secondary" fontSize={{ xs: "0.9rem", sm: "1rem" }}>
            No videos uploaded yet.
          </Typography>
        )}
      </Box>

      {/* ✅ Confirm Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, action: null, videoId: null })}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}>
          Confirm {confirmDialog.action}
        </DialogTitle>
        <DialogContent>
          <Typography fontSize={{ xs: "0.9rem", sm: "1rem" }}>
            Are you sure you want to {confirmDialog.action} this video?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialog({ open: false, action: null, videoId: null })}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(confirmDialog.videoId)}
            color="error"
            variant="contained"
            disabled={actionLoading === confirmDialog.videoId}
          >
            {actionLoading === confirmDialog.videoId ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Edit Dialog */}
      <Dialog
        open={editDialog.open}
        onClose={() => setEditDialog({ open: false, videoId: null, title: "" })}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Video Title</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Video Title"
            type="text"
            fullWidth
            value={editDialog.title}
            onChange={(e) => setEditDialog({ ...editDialog, title: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditDialog({ open: false, videoId: null, title: "" })}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            disabled={actionLoading === editDialog.videoId}
          >
            {actionLoading === editDialog.videoId ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar Messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VideoUploader;
