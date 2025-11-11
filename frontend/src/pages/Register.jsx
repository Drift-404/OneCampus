import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { name, email, password, role });
      
      // Save JWT and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      
      navigate("/"); // redirect to home
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-xl shadow transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 dark:bg-indigo-500 text-white dark:text-gray-200 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}
