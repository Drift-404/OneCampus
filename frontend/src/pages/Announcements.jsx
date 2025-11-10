import React, { useEffect, useState } from "react";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/announcements")
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(() => setAnnouncements([]));
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Latest Announcements</h2>
      {announcements.length === 0 ? (
        <p className="text-gray-600">No announcements yet.</p>
      ) : (
        <ul className="space-y-3">
          {announcements.map((a, i) => (
            <li key={i} className="bg-white shadow p-4 rounded-lg border">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-gray-600">{a.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
