import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend server

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [attachment, setAttachment] = useState(null);
  const role = localStorage.getItem("role"); // ADMIN or USER

  // Fetch announcements from backend
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      setAnnouncements([]);
    }
  };

  useEffect(() => {
    fetchAnnouncements();

    // Listen for new announcements via Socket.IO
    socket.on("newAnnouncement", (announcement) => {
      setAnnouncements((prev) => [announcement, ...prev]);
    });

    return () => {
      socket.off("newAnnouncement");
    };
  }, []);

  // Handle posting a new announcement (admin only)
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (date) formData.append("date", date);
      if (attachment) formData.append("attachment", attachment);

      const res = await axios.post("http://localhost:5000/api/announcements", formData, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });

      // Optional: update immediately (Socket.IO will also update)
      setAnnouncements((prev) => [res.data, ...prev]);

      setTitle("");
      setContent("");
      setDate("");
      setAttachment(null);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add announcement");
    }
  };

  return (
    <section className="py-12 px-6 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Latest Announcements
      </h2>

      {/* Admin Add Announcement Form */}
      {role === "admin" && (
        <div className="max-w-md mx-auto mb-10 p-6 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">Add Announcement</h3>
          <form className="flex flex-col gap-3" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              className="border p-2 rounded"
              accept="image/*,application/pdf"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Post Announcement
            </button>
          </form>
        </div>
      )}

      {/* Announcements List */}
      {announcements.length === 0 ? (
        <p className="text-gray-600 text-center">No announcements yet.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {announcements.map((a, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl p-6 w-80 hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">{a.title}</h3>
              {a.date && <p className="text-sm text-gray-500 mb-3">{a.date}</p>}
              <p className="text-gray-700 mb-3">{a.content}</p>

              {/* Attachment Preview */}
              {a.attachment && (
                <>
                  {a.attachment.endsWith(".pdf") ? (
                    <a
                      href={`http://localhost:5000${a.attachment}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 underline"
                    >
                      View PDF
                    </a>
                  ) : (
                    <img
                      src={`http://localhost:5000${a.attachment}`}
                      alt="attachment"
                      className="mt-2 rounded max-h-48 object-contain"
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
