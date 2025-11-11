import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // connect to backend Socket.IO

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [attachment, setAttachment] = useState(null);
  const role = localStorage.getItem("role")?.toUpperCase(); // ADMIN or USER

  // Fetch all announcements from backend
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Error fetching announcements", err);
      setAnnouncements([]);
    }
  };

  useEffect(() => {
    fetchAnnouncements();

    // Listen for real-time updates
    socket.on("newAnnouncement", (announcement) => {
      setAnnouncements((prev) => [announcement, ...prev]);
    });

    // Cleanup on unmount
    return () => socket.off("newAnnouncement");
  }, []);

  // Handle admin posting a new announcement
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (date) formData.append("date", date);
      if (attachment) formData.append("attachment", attachment);

      await axios.post("http://localhost:5000/api/announcements", formData, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form
      setTitle("");
      setContent("");
      setDate("");
      setAttachment(null);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to post announcement");
    }
  };

  // Handle admin deleting an announcement
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      // Remove from state instantly
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to delete announcement");
    }
  };

  return (
    <section className="py-12 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
        Latest Announcements
      </h2>

      {/* Admin Add Announcement Form */}
      {role === "ADMIN" && (
        <div className="max-w-md mx-auto mb-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow transition-colors">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
            Add Announcement
          </h3>
          <form className="flex flex-col gap-3" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              required
            />
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Post Announcement
            </button>
          </form>
        </div>
      )}

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          No announcements yet.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {announcements.map((a) => (
            <div
              key={a._id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-80 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {a.title}
                </h3>

                {/* Delete Button (Admin only) */}
                {role === "ADMIN" && (
                  <button
                    onClick={() => handleDelete(a._id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold text-sm transition"
                    title="Delete Announcement"
                  >
                    ✕
                  </button>
                )}
              </div>

              {a.date && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {new Date(a.date).toLocaleDateString()}
                </p>
              )}

              <p className="text-gray-700 dark:text-gray-300 mb-2">{a.content}</p>

              {a.attachment &&
                (a.attachment.endsWith(".pdf") ? (
                  <a
                    href={`http://localhost:5000${a.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 underline"
                  >
                    View PDF
                  </a>
                ) : (
                  <img
                    src={`http://localhost:5000${a.attachment}`}
                    alt="attachment"
                    className="max-h-48 mt-2 rounded"
                  />
                ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
