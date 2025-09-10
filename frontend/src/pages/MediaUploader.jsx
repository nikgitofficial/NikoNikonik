// src/pages/MediaUploader.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  CircularProgress,
  Tooltip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const MediaUploader = () => {
  const [fileStatus, setFileStatus] = useState({});
  const navigate = useNavigate();
  const [mediaList, setMediaList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [actionLoading, setActionLoading] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    mediaId: null,
  });

  // ✅ Edit modal
  const [editDialog, setEditDialog] = useState({
    open: false,
    mediaId: null,
    title: "",
  });

  // ✅ Drag-and-drop
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  // ✅ Cancel controllers
  const [controllers, setControllers] = useState([]);

  const fetchMedia = async () => {
    try {
      const res = await api.get("/media");
      setMediaList(res.data);
    } catch (err) {
      console.error("Failed to fetch media:", err);
      setSnackbar({
        open: true,
        message: "Failed to fetch media.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    try {
      setLoading(true);
      const newControllers = [];

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name);

        // 🔄 init progress state for this file
        setFileStatus((prev) => ({
          ...prev,
          [file.name]: { progress: 0, done: false },
        }));

        const controller = new AbortController();
        newControllers.push(controller);

        await api.post("/media/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          signal: controller.signal,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setFileStatus((prev) => ({
              ...prev,
              [file.name]: { progress: percent, done: false },
            }));
          },
        });

        // ✅ mark file as done
        setFileStatus((prev) => ({
          ...prev,
          [file.name]: { progress: 100, done: true },
        }));
      }

      setControllers(newControllers);
      setSelectedFiles([]);
      fetchMedia();
      setSnackbar({
        open: true,
        message: "Media uploaded successfully!",
        severity: "success",
      });
    } catch (err) {
      if (err.name === "CanceledError") {
        setSnackbar({
          open: true,
          message: "Upload canceled.",
          severity: "warning",
        });
      } else {
        console.error("Upload failed:", err);
        setSnackbar({
          open: true,
          message: "Upload failed.",
          severity: "error",
        });
      }
    } finally {
      setLoading(false);
      setControllers([]);
    }
  };

  // ✅ Cancel All Uploads
  const handleCancelAll = () => {
    controllers.forEach((c) => c.abort());
    setControllers([]);
    setLoading(false);
    setSelectedFiles([]);
    setFileStatus({});
    setSnackbar({
      open: true,
      message: "All uploads canceled.",
      severity: "info",
    });
  };

  const handleDelete = async (id) => {
    try {
      setActionLoading(id); // ✅ disable & show spinner
      await api.delete(`/media/${id}`);
      fetchMedia();
      setSnackbar({
        open: true,
        message: "Media deleted successfully!",
        severity: "success",
      });
    } catch (err) {
      console.error("Delete failed:", err);
      setSnackbar({
        open: true,
        message: "Delete failed.",
        severity: "error",
      });
    } finally {
      setActionLoading(null);
      setConfirmDialog({ open: false, action: null, mediaId: null });
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/media/download/${id}`);
      window.open(res.data.url, "_blank");
      setSnackbar({
        open: true,
        message: "Download started.",
        severity: "info",
      });
    } catch (err) {
      console.error("Download failed:", err);
      setSnackbar({
        open: true,
        message: "Download failed.",
        severity: "error",
      });
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (id, currentTitle) => {
    setEditDialog({ open: true, mediaId: id, title: currentTitle });
  };

  // ✅ Save Edit
  const handleSaveEdit = async () => {
    try {
      setActionLoading(editDialog.mediaId);
      await api.put(`/media/${editDialog.mediaId}`, {
        title: editDialog.title,
      });
      fetchMedia();
      setSnackbar({
        open: true,
        message: "Media updated successfully!",
        severity: "success",
      });
      setEditDialog({ open: false, mediaId: null, title: "" });
    } catch (err) {
      console.error("Edit failed:", err);
      setSnackbar({
        open: true,
        message: "Edit failed.",
        severity: "error",
      });
    } finally {
      setActionLoading(null);
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
        Upload Images & Videos
      </Typography>

      {/* Upload Form */}
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <form onSubmit={handleUpload}>
          {/* Hidden Input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Drag & Drop Zone */}
          <Box
            onClick={() => inputRef.current.click()}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            sx={{
              p: 3,
              border: dragActive
                ? "3px dashed primary.main"
                : "2px dashed grey.500",
              borderRadius: 2,
              bgcolor: dragActive ? "primary.50" : "grey.100",
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": { bgcolor: "grey.200" },
            }}
          >
            <Typography>
              {dragActive
                ? "Release to drop files here"
                : "Click or drag & drop files here"}
            </Typography>
          </Box>

          {/* Upload & Cancel Buttons */}
          <Box mt={2} display="flex" justifyContent="center" gap={2}>
            <Tooltip title="Upload selected files">
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ minWidth: "120px" }}
              >
                {loading ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <CircularProgress size={20} color="inherit" />
                    {uploadProgress > 0 && `${uploadProgress}%`}
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
                >
                  Cancel All
                </Button>
              </Tooltip>
            )}
          </Box>
        </form>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <Box mt={2} textAlign="left">
            <Typography fontWeight="bold">Selected Files:</Typography>
            <ul
              style={{
                paddingLeft: "20px",
                fontSize: "0.9rem",
                listStyle: "none",
              }}
            >
              {selectedFiles.map((file, i) => {
                const status = fileStatus[file.name] || {
                  progress: 0,
                  done: false,
                };

                return (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                    }}
                  >
                    <Typography>{file.name}</Typography>

                    {status.done ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : status.progress > 0 ? (
                      <Box display="flex" alignItems="center" gap={1}>
                        <CircularProgress
                          size={18}
                          color="primary"
                          variant="determinate"
                          value={status.progress}
                        />
                        <Typography variant="caption">
                          {status.progress}%
                        </Typography>
                      </Box>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </Box>
        )}
      </Paper>

      {/* Media List */}
      <Box mt={4} width="100%" maxWidth="800px">
        <Typography variant="h5" mb={2}>
          Your Media
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {mediaList.map((item) => (
          <Paper key={item._id} sx={{ p: 2, mb: 2, borderRadius: 2 }} elevation={2}>
            <Typography fontWeight="bold">{item.title}</Typography>
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={item.title}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
            ) : (
              <video
                src={item.url}
                controls
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
            )}

            <Box mt={1} display="flex" gap={1} flexWrap="wrap">
              <Tooltip title="Edit title">
                <Button
                  size="small"
                  onClick={() => handleEdit(item._id, item.title)}
                  disabled={actionLoading === item._id}
                >
                  Edit
                </Button>
              </Tooltip>
              <Tooltip title="Download file">
                <Button
                  size="small"
                  onClick={() => handleDownload(item._id)}
                  disabled={actionLoading === item._id}
                >
                  Download
                </Button>
              </Tooltip>
              <Tooltip title="Delete file">
                <span>
                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      setConfirmDialog({
                        open: true,
                        action: "delete",
                        mediaId: item._id,
                      })
                    }
                    disabled={actionLoading === item._id}
                    sx={{
                      borderRadius: actionLoading === item._id ? "50%" : "4px",
                      minWidth: actionLoading === item._id ? "40px" : "64px",
                      width: actionLoading === item._id ? "40px" : "auto",
                      height: actionLoading === item._id ? "40px" : "auto",
                      p: actionLoading === item._id ? 0 : "6px 16px",
                    }}
                  >
                    {actionLoading === item._id ? (
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

        {mediaList.length === 0 && (
          <Typography align="center" color="text.secondary">
            No media uploaded yet.
          </Typography>
        )}
      </Box>

      {/* Confirm Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() =>
          setConfirmDialog({ open: false, action: null, mediaId: null })
        }
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm {confirmDialog.action}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {confirmDialog.action} this file?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setConfirmDialog({ open: false, action: null, mediaId: null })
            }
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(confirmDialog.mediaId)}
            color="error"
            variant="contained"
            disabled={actionLoading === confirmDialog.mediaId}
          >
            {actionLoading === confirmDialog.mediaId ? (
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
        onClose={() => setEditDialog({ open: false, mediaId: null, title: "" })}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Edit Media Title</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="New Title"
            value={editDialog.title}
            onChange={(e) =>
              setEditDialog({ ...editDialog, title: e.target.value })
            }
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setEditDialog({ open: false, mediaId: null, title: "" })
            }
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            disabled={actionLoading === editDialog.mediaId}
          >
            {actionLoading === editDialog.mediaId ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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

export default MediaUploader;
