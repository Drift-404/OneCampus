import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachment: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", AnnouncementSchema);
