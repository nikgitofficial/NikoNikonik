import express from "express";
import { sendMessage, getMessages, deleteMessage  } from "../controllers/contactController.js";
// import verifyToken from "../middleware/verifyToken.js"; // if you want auth

const router = express.Router();

// Public contact form
router.post("/", sendMessage);

// Admin can fetch messages
router.get("/", getMessages);

// delete messages
router.delete("/:id", deleteMessage);

export default router;