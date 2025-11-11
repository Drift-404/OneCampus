import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Auth middleware to verify token
export const authMiddleware = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // ✅ Normalize role to lowercase for consistent checks everywhere
    req.user.role = req.user.role?.toLowerCase();

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ msg: "Token is invalid" });
  }
};

// Admin check middleware
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied, admins only" });
  }
  next();
};
