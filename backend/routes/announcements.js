import express from "express";
import Announcement from "../models/Announcement.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// GET all announcements (public)
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST new announcement (admin only)
router.post("/", authMiddleware, adminOnly, async (req, res) => {
  const { title, content, date } = req.body;
  try {
    const newAnnouncement = new Announcement({ title, content, date });
    await newAnnouncement.save();
    res.json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
