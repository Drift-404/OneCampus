import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";  // ✅ MUST MATCH your filename
import postRoutes from "./routes/postRoutes.js";
import announcementRoutes from "./routes/Announcement.js"; // your new route

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server for Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // adjust in production
});

// Make io accessible in routes
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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/announcements", announcementRoutes); // add announcements

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
