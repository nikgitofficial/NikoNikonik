import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";
import User from "../models/User.js";
import Image from "../models/Image.js";
import Video from "../models/Video.js";
import Media from "../models/Media.js";

const router = express.Router();

// ✅ Example admin-only route
router.get("/dashboard", authenticate, adminOnly, (req, res) => {
  res.json({ msg: "Welcome, Admin!", user: req.user });
});

// ✅ Get total user count
router.get("/user-count", authenticate, adminOnly, async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get all users
router.get("/users", authenticate, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get all images
router.get("/images", authenticate, adminOnly, async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get all videos
router.get("/videos", authenticate, adminOnly, async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get all media
router.get("/media", authenticate, adminOnly, async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Get media counts (images, videos, media)
router.get("/stats", authenticate, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalImages = await Image.countDocuments();
    const totalVideos = await Video.countDocuments();
    const totalMedia = await Media.countDocuments();

    res.json({
      totalUsers,
      totalImages,
      totalVideos,
      totalMedia,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});



export default router;



