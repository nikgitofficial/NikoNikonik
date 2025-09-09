import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const MediaUploader = () => {
  const navigate = useNavigate();
  const [mediaList, setMediaList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const fetchMedia = async () => {
    try {
      const res = await api.get("/media");
      setMediaList(res.data);
    } catch (err) {
      console.error("Failed to fetch media:", err);
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

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name);

        await api.post("/media/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setSelectedFiles([]);
      fetchMedia();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/media/${id}`);
      fetchMedia();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/media/download/${id}`);
      window.open(res.data.url, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleEdit = async (id) => {
    const newTitle = prompt("Enter new title:");
    if (!newTitle) return;

    try {
      await api.put(`/media/${id}`, { title: newTitle });
      fetchMedia();
    } catch (err) {
      console.error("Edit failed:", err);
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
      <h2>Upload Images & Videos</h2>
      <form onSubmit={handleUpload}>
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Drag and Drop Zone */}
        <div
          onClick={() => inputRef.current.click()}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            marginTop: "15px",
            padding: "20px",
            border: dragActive ? "3px dashed #0275d8" : "2px dashed #999",
            borderRadius: "10px",
            textAlign: "center",
            background: dragActive ? "#f0f8ff" : "#fafafa",
            cursor: "pointer",
          }}
        >
          {dragActive
            ? "Release to drop files here"
            : "Click or drag & drop files here"}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "10px", padding: "10px 15px" }}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {selectedFiles.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Selected Files:</strong>
          <ul>
            {selectedFiles.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <h3>Your Media</h3>
      {mediaList.map((item) => (
        <div key={item._id} style={{ marginBottom: "20px" }}>
          <p>
            <strong>{item.title}</strong>
          </p>
          {item.type === "image" ? (
            <img src={item.url} alt={item.title} width="100%" />
          ) : (
            <video src={item.url} controls width="100%" />
          )}
          <button onClick={() => handleEdit(item._id)}>Edit</button>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
          <button onClick={() => handleDownload(item._id)}>Download</button>
        </div>
      ))}
    </div>
  );
};

export default MediaUploader;
