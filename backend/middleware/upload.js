import multer from "multer";
import os from "os";
import path from "path";

// Store uploaded files in OS temp folder instead of memory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir());
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024 // ✅ 500MB max (adjust if needed)
  }
});
