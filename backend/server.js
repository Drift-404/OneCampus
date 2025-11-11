import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import announcementRoutes from "./routes/announcements.js"; // make sure file name is exactly this

dotenv.config();
const app = express();

// Allow frontend to connect
app.use(cors({ origin: "*",})); // adjust origin if needed

// Parse JSON requests
app.use(express.json());

// Serve uploads folder (so images/PDFs can be accessed by frontend)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create HTTP server for Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // adjust in production
});

// Make io accessible in all routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Connect MongoDB
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/OneCampus";

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log("Connected to:", MONGO);
  })
  .catch((err) => console.error("MongoDB error", err));

// ------------------- Routes -------------------
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/announcements", announcementRoutes); // announcements route

// ---------------- Socket.IO -----------------
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
