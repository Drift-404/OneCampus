import express from "express";
import multer from "multer";
import Announcement from "../models/Announcement.js";
import { authMiddleware, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// ---------------- Multer setup for file uploads ----------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});

const upload = multer({ storage });

// ---------------- GET all announcements ----------------
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ---------------- POST new announcement (admin only) ----------------
router.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.single("attachment"), // optional file upload
  async (req, res) => {
    const { title, content, date } = req.body;

    if (!title || !content)
      return res.status(400).json({ msg: "Title and content are required" });

    try {
      const newAnnouncement = new Announcement({
        title,
        content,
        date: date || new Date(),
        createdBy: req.user._id,
        attachment: req.file ? `/uploads/${req.file.filename}` : null,
      });

      await newAnnouncement.save();

      // Send real-time update to all connected clients
      req.io.emit("newAnnouncement", newAnnouncement);

      res.status(201).json(newAnnouncement);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Normalize role to lowercase
    if (req.user.role.toLowerCase() !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ msg: "Announcement not found" });
    }

    res.json({ msg: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "Server error deleting announcement" });
  }
});

export default router;
