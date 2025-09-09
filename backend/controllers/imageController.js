import cloudinary from "../utils/cloudinary.js";
import Image from "../models/Image.js";
import streamifier from "streamifier";

// 📤 Upload Image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No image uploaded" });

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "user_images_authv2" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const newImage = new Image({
      user: req.user.id,
      title: req.body.title || "Untitled",
      url: result.secure_url,
      public_id: result.public_id,
    });

    await newImage.save();

    res.status(201).json(newImage);
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 📥 Get User Images
export const getUserImages = async (req, res) => {
  try {
    const images = await Image.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ❌ Delete Image
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ msg: "Image not found" });
    if (image.user.toString() !== req.user.id) return res.status(401).json({ msg: "Not authorized" });

    await cloudinary.uploader.destroy(image.public_id, { resource_type: "image" });
    await image.deleteOne();

    res.json({ msg: "Image deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✏️ Update Image Title
export const updateImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ msg: "Image not found" });
    if (image.user.toString() !== req.user.id) return res.status(401).json({ msg: "Not authorized" });

    image.title = req.body.title || image.title;
    await image.save();

    res.json(image);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ⬇️ Download Image
export const downloadImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ msg: "Image not found" });

    res.redirect(image.url);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
