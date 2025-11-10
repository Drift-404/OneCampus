import React from "react";
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/register', form)
      alert('Registered! You can now login.')
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.error || 'Register failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow">
        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
          placeholder="Full name" className="w-full border p-2 rounded mb-2" />
        <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
          placeholder="Email" className="w-full border p-2 rounded mb-2" />
        <input value={form.password} onChange={e => setForm({...form, password: e.target.value})}
          type="password" placeholder="Password" className="w-full border p-2 rounded mb-2" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  )
}
