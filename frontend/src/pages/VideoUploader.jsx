import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../api/axios";

const VideoUploader = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const fetchVideos = async () => {
    try {
      const res = await api.get("/videos");
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to fetch videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    try {
      setLoading(true);
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("video", file);
        formData.append("title", file.name);
        await api.post("/videos/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setSelectedFiles([]);
      fetchVideos();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/videos/${id}`);
      fetchVideos();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (id, currentTitle) => {
    setEditingId(id);
    setNewTitle(currentTitle);
  };

  const handleSaveEdit = async (id) => {
    try {
      await api.put(`/videos/${id}`, { title: newTitle });
      setEditingId(null);
      setNewTitle("");
      fetchVideos();
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/videos/download/${id}`);
      window.open(res.request.responseURL, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
       {/* ✅ Back Link */}
      <p
        onClick={() => navigate(-1)} // navigate back
        style={{
          color: "#0275d8",
          cursor: "pointer",
          textDecoration: "underline",
          marginBottom: "20px",
        }}
      >
        ← Back
      </p>
      <h2>Upload Videos</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="video/*" multiple onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {selectedFiles.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Selected Files:</strong>
          <ul>{selectedFiles.map((file, i) => <li key={i}>{file.name}</li>)}</ul>
        </div>
      )}

      <h3>Your Videos</h3>
      {videos.map((vid) => (
        <div key={vid._id} style={{ marginBottom: "15px" }}>
          {editingId === vid._id ? (
            <>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(vid._id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{vid.title}</p>
              <video src={vid.url} controls width="100%" />
              <div>
                <button onClick={() => handleEdit(vid._id, vid.title)}>Edit</button>
                <button onClick={() => handleDownload(vid._id)}>Download</button>
                <button onClick={() => handleDelete(vid._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoUploader;
