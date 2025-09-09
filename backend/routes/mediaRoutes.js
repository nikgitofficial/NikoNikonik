import express from "express";
import {
  uploadMedia,
  getUserMedia,
  editMedia,
  deleteMedia,
  downloadMedia,
} from "../controllers/mediaController.js";
import authenticate from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/upload", authenticate, upload.single("file"), uploadMedia);
router.get("/", authenticate, getUserMedia);
router.put("/:id", authenticate, editMedia);
router.delete("/:id", authenticate, deleteMedia);
router.get("/download/:id", authenticate, downloadMedia);


export default router;
