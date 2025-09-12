import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import profileRoutes from './routes/profileRoutes.js';

//admin routes 
import adminRoutes from "./routes/adminRoutes.js";

//public  routes
import contactRoutes from "./routes/contactRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";

//subscription
import subscriptionRoutes from "./routes/subscriptionRoutes.js";


dotenv.config();
const app = express();

// ✅ Environment variables
const PORT = process.env.PORT || 5000;

const CLIENT_URLS = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173", // local dev
  "https://niko-nikonik-rouge.vercel.app",
   "https://niko-nikonik-rouge.vercel.app", // deployed frontend
  
  
];

// ✅ CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || CLIENT_URLS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin: " + origin));
    }
  },
  credentials: true,
}));
// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/media/images", imageRoutes);
app.use('/api/profile', profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api", ratingRoutes);
app.use("/api/subscription", subscriptionRoutes);




// ✅ MongoDB + Server Start
mongoose.connect(process.env.MONGO_URI, {
  
}).then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});