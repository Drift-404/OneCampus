import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";  // ✅ MUST MATCH your filename
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

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

// ✅ This is what registers your /api/auth routes
app.use("/api/auth", authRoutes);

// Optional: for posts
app.use("/api/posts", postRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
