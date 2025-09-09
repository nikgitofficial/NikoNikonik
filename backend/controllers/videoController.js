import cloudinary from "../utils/cloudinary.js";
import Video from "../models/Video.js";
import streamifier from "streamifier";

// 📤 Upload Video
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No video uploaded" });

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "user_videos_nikonikonik" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const newVideo = new Video({
      user: req.user.id,
      title: req.body.title || "Untitled",
      url: result.secure_url,
      public_id: result.public_id,
    });

    await newVideo.save();

    res.status(201).json(newVideo);
  } catch (err) {
    console.error("Video upload error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 📥 Get User Videos
export const getUserVideos = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ❌ Delete Video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ msg: "Video not found" });

    if (video.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await cloudinary.uploader.destroy(video.public_id, { resource_type: "video" });
    await video.deleteOne();

    res.json({ msg: "Video deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✏️ Update Video Title
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ msg: "Video not found" });

    if (video.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    video.title = req.body.title || video.title;
    await video.save();

    res.json(video);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ⬇️ Download Video
export const downloadVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ msg: "Video not found" });

    res.redirect(video.url); // Cloudinary hosted file
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
