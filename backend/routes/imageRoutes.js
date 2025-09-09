import express from "express";
import { uploadImage, getUserImages, deleteImage, updateImage, downloadImage } from "../controllers/imageController.js";
import authenticate from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/upload", authenticate, upload.single("image"), uploadImage);
router.get("/", authenticate, getUserImages);
router.delete("/:id", authenticate, deleteImage);
router.put("/:id", authenticate, updateImage);
router.get("/download/:id", authenticate, downloadImage);

export default router;
