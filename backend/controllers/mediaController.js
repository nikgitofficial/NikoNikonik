import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";
import Media from "../models/Media.js"; // ✅ new unified model

// 📤 Upload Media (image or video)
export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const resourceType = req.file.mimetype.startsWith("video") ? "video" : "image";

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: resourceType, folder: "user_media_nikonikonik" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const newMedia = new Media({
      user: req.user.id,
      title: req.body.title || req.file.originalname,
      url: result.secure_url,
      public_id: result.public_id,
      type: resourceType, // "image" | "video"
    });

    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (err) {
    console.error("Media upload error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 📥 Get User Media
export const getUserMedia = async (req, res) => {
  try {
    const media = await Media.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✏️ Edit Media Title
export const editMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ msg: "Not found" });

    if (media.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    media.title = req.body.title || media.title;
    await media.save();

    res.json(media);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ❌ Delete Media
export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ msg: "Not found" });

    if (media.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await cloudinary.uploader.destroy(media.public_id, { resource_type: media.type });
    await media.deleteOne();

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// 📥 Download Media
export const downloadMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ msg: "Not found" });

    if (media.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const downloadUrl = `${media.url.replace("/upload/", "/upload/fl_attachment/")}`;
    res.json({ url: downloadUrl });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


