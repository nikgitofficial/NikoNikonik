import ContactMessage from "../models/ContactMessage.js";

// @desc Send a message
// @route POST /api/contact
// @access Public (or protected if you want auth)
export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new ContactMessage({
      name,
      email,
      message,
      userId: req.user ? req.user.id : null, // if auth middleware is used
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Get all messages (admin only)
// @route GET /api/contact
export const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


// @desc Delete a single message (admin only)
// @route DELETE /api/contact/:id
// @access Admin
export const deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    await message.deleteOne();
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Server error" });
  }
};