import React from "react";
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow">
        <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
          placeholder="Email" className="w-full border p-2 rounded mb-2" />
        <input value={form.password} onChange={e => setForm({...form, password: e.target.value})}
          type="password" placeholder="Password" className="w-full border p-2 rounded mb-2" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  )
}
