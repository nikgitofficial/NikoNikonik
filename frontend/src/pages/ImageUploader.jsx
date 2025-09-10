// src/pages/ImageUploader.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
} from "@mui/material";

const ImageUploader = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileStatus, setFileStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null, imageId: null });

  // ✅ Edit modal
  const [editDialog, setEditDialog] = useState({
    open: false,
    imageId: null,
    title: "",
  });

  const inputRef = useRef(null);

  // ✅ Cancel controllers
  const [controllers, setControllers] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await api.get("/media/images");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
      setSnackbar({ open: true, message: "Failed to fetch images.", severity: "error" });
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFiles.length) return;

    try {
      setLoading(true);
      const newControllers = [];

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", file.name);

        // 🔄 init progress for this file
        setFileStatus((prev) => ({
          ...prev,
          [file.name]: { progress: 0, done: false },
        }));

        const controller = new AbortController();
        newControllers.push(controller);

        await api.post("/media/images/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          signal: controller.signal,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setFileStatus((prev) => ({
              ...prev,
              [file.name]: { progress: percent, done: false },
            }));
          },
        });

        // ✅ mark as done
        setFileStatus((prev) => ({
          ...prev,
          [file.name]: { progress: 100, done: true },
        }));
      }

      setControllers(newControllers);
      setSelectedFiles([]);
      fetchImages();
      setSnackbar({ open: true, message: "Images uploaded successfully!", severity: "success" });
    } catch (err) {
      if (err.name === "CanceledError") {
        setSnackbar({
          open: true,
          message: "Upload canceled.",
          severity: "warning",
        });
      } else {
        console.error("Upload failed:", err);
        setSnackbar({ open: true, message: "Upload failed.", severity: "error" });
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
      setActionLoading(id);
      await api.delete(`/media/images/${id}`);
      fetchImages();
      setSnackbar({ open: true, message: "Image deleted successfully!", severity: "success" });
    } catch (err) {
      console.error("Delete failed:", err);
      setSnackbar({ open: true, message: "Delete failed.", severity: "error" });
    } finally {
      setActionLoading(null);
      setConfirmDialog({ open: false, action: null, imageId: null });
    }
  };

  const handleEdit = (id, currentTitle) => {
    setEditDialog({ open: true, imageId: id, title: currentTitle });
  };

  const handleSaveEdit = async () => {
    try {
      setActionLoading(editDialog.imageId);
      await api.put(`/media/images/${editDialog.imageId}`, { title: editDialog.title });
      fetchImages();
      setSnackbar({ open: true, message: "Image updated successfully!", severity: "success" });
      setEditDialog({ open: false, imageId: null, title: "" });
    } catch (err) {
      console.error("Edit failed:", err);
      setSnackbar({ open: true, message: "Edit failed.", severity: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/media/images/download/${id}`);
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
        Upload Images
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
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            onClick={() => inputRef.current.click()}
            fullWidth
            sx={{ mb: 2 }}
          >
            Select Images
          </Button>
          <Box display="flex" justifyContent="center" gap={2}>
            <Tooltip title="Upload selected images">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ minWidth: "120px" }}
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Upload"
                )}
              </Button>
            </Tooltip>

            {loading && (
              <Tooltip title="Cancel all uploads">
                <Button variant="outlined" color="error" onClick={handleCancelAll}>
                  Cancel All
                </Button>
              </Tooltip>
            )}
          </Box>
        </form>

        {/* Selected Files with per-file status */}
        {selectedFiles.length > 0 && (
          <Box mt={2} textAlign="left">
            <Typography fontWeight="bold">Selected Files:</Typography>
            <ul style={{ paddingLeft: "20px", fontSize: "0.9rem", listStyle: "none" }}>
              {selectedFiles.map((file, i) => {
                const status = fileStatus[file.name] || { progress: 0, done: false };
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
                        <Typography variant="caption">{status.progress}%</Typography>
                      </Box>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </Box>
        )}
      </Paper>

      {/* Images List */}
      <Box mt={4} width="100%" maxWidth="800px">
        <Typography variant="h5" mb={2}>
          Your Images
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {images.map((img) => (
          <Paper key={img._id} sx={{ p: 2, mb: 2, borderRadius: 2 }} elevation={2}>
            <Typography fontWeight="bold">{img.title}</Typography>
            <img
              src={img.url}
              alt={img.title}
              style={{
                width: "100%",
                borderRadius: "8px",
                marginTop: "8px",
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
            <Box mt={1} display="flex" gap={1} flexWrap="wrap">
              <Tooltip title="Edit title">
                <Button size="small" onClick={() => handleEdit(img._id, img.title)} disabled={actionLoading === img._id}>
                  Edit
                </Button>
              </Tooltip>
              <Tooltip title="Download image">
                <Button size="small" onClick={() => handleDownload(img._id)} disabled={actionLoading === img._id}>
                  Download
                </Button>
              </Tooltip>
              <Tooltip title="Delete image">
                <span>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => setConfirmDialog({ open: true, action: "delete", imageId: img._id })}
                    disabled={actionLoading === img._id}
                    sx={{
                      borderRadius: actionLoading === img._id ? "50%" : "4px",
                      minWidth: actionLoading === img._id ? "40px" : "64px",
                      width: actionLoading === img._id ? "40px" : "auto",
                      height: actionLoading === img._id ? "40px" : "auto",
                      p: actionLoading === img._id ? 0 : "6px 16px",
                    }}
                  >
                    {actionLoading === img._id ? <CircularProgress size={20} color="inherit" /> : "Delete"}
                  </Button>
                </span>
              </Tooltip>
            </Box>
          </Paper>
        ))}

        {images.length === 0 && (
          <Typography align="center" color="text.secondary">
            No images uploaded yet.
          </Typography>
        )}
      </Box>

      {/* ✅ Confirm Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, action: null, imageId: null })}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm {confirmDialog.action}</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to {confirmDialog.action} this image?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialog({ open: false, action: null, imageId: null })}
            color="inherit"
            disabled={actionLoading === confirmDialog.imageId}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(confirmDialog.imageId)}
            color="error"
            variant="contained"
            disabled={actionLoading === confirmDialog.imageId}
          >
            {actionLoading === confirmDialog.imageId ? (
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
        onClose={() => setEditDialog({ open: false, imageId: null, title: "" })}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Edit Image Title</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="New Title"
            value={editDialog.title}
            onChange={(e) => setEditDialog({ ...editDialog, title: e.target.value })}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, imageId: null, title: "" })} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} variant="contained" disabled={actionLoading === editDialog.imageId}>
            {actionLoading === editDialog.imageId ? <CircularProgress size={20} color="inherit" /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar */}
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

export default ImageUploader;
