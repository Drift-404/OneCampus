// backend/routes/announcementRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import Announcement from "../models/Announcement.js";
import { authMiddleware, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// -------------------- Multer Setup for File Uploads -------------------- //
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

// -------------------- Routes -------------------- //

// Create new announcement (admin only)
router.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.single("attachment"), // "attachment" field in form
  async (req, res) => {
    try {
      const { title, content, date } = req.body;

      if (!title || !content) {
        return res.status(400).json({ msg: "Title and content are required" });
      }

      const newAnnouncement = new Announcement({
        title,
        content,
        date: date || new Date(),
        createdBy: req.user._id,
        attachment: req.file ? `/uploads/${req.file.filename}` : null,
      });

      await newAnnouncement.save();

      // Emit real-time event to all clients
      req.io.emit("newAnnouncement", newAnnouncement);

      res.status(201).json(newAnnouncement);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to create announcement", error: err.message });
    }
  }
);

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email"); // optional: show creator info
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch announcements", error: err.message });
  }
});

export default router;
