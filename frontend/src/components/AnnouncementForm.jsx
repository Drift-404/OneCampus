// frontend/src/components/AnnouncementForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function AnnouncementForm({ onNewAnnouncement }) {
  const [text, setText] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    if (attachment) formData.append('attachment', attachment);

    const token = localStorage.getItem('token'); // or your auth storage
    const res = await axios.post('/api/announcements', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    onNewAnnouncement(res.data);
    setText('');
    setAttachment(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your announcement..."
        required
      />
      <input type="file" onChange={(e) => setAttachment(e.target.files[0])} />
      <button type="submit">Post Announcement</button>
    </form>
  );
}
