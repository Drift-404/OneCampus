import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({ title: '', description: '' })

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/posts', form)
      setPosts([res.data, ...posts])
      setForm({ title: '', description: '' })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      <form onSubmit={submit} className="mb-6 bg-white p-4 rounded shadow">
        <input value={form.title} onChange={e => setForm({...form, title: e.target.value})}
          placeholder="Title" className="w-full border p-2 rounded mb-2" />
        <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
          placeholder="Description" className="w-full border p-2 rounded mb-2" rows={4} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>
      </form>

      <div className="space-y-4">
        {posts.map(p => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-gray-700">{p.description}</p>
            <p className="text-xs text-gray-400 mt-2">{new Date(p.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
