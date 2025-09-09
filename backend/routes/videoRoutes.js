import express from "express";
import { uploadVideo, getUserVideos, deleteVideo,updateVideo,downloadVideo } from "../controllers/videoController.js";
import authenticate from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/upload", authenticate, upload.single("video"), uploadVideo);
router.get("/", authenticate, getUserVideos);
router.delete("/:id", authenticate, deleteVideo);
router.put("/:id", authenticate, updateVideo);   
router.get("/download/:id", authenticate, downloadVideo); 


export default router;
