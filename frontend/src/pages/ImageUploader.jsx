import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const ImageUploader = () => {
  const navigate = useNavigate(); 
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const fetchImages = async () => {
    try {
      const res = await api.get("/media/images");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => setSelectedFiles(Array.from(e.target.files));

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFiles.length) return;

    try {
      setLoading(true);
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", file.name);
        await api.post("/media/images/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setSelectedFiles([]);
      fetchImages();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/media/images/${id}`);
      fetchImages();
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
      await api.put(`/media/images/${id}`, { title: newTitle });
      setEditingId(null);
      setNewTitle("");
      fetchImages();
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await api.get(`/media/images/download/${id}`);
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
      <h2>Upload Images</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" multiple onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
      </form>

      {selectedFiles.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Selected Files:</strong>
          <ul>{selectedFiles.map((file, i) => <li key={i}>{file.name}</li>)}</ul>
        </div>
      )}

      <h3>Your Images</h3>
      {images.map((img) => (
        <div key={img._id} style={{ marginBottom: "15px" }}>
          {editingId === img._id ? (
            <>
              <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              <button onClick={() => handleSaveEdit(img._id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{img.title}</p>
              <img src={img.url} alt={img.title} width="100%" />
              <div>
                <button onClick={() => handleEdit(img._id, img.title)}>Edit</button>
                <button onClick={() => handleDownload(img._id)}>Download</button>
                <button onClick={() => handleDelete(img._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
