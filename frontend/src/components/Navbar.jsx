import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">OneCampus</Link>
      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/clubs">Clubs</Link>
        <Link to="/announcements">Announcements</Link>

        {name ? (
          <>
            {role === "ADMIN" && <span className="bg-yellow-400 text-gray-800 px-2 py-1 rounded">ADMIN</span>}
            <span>{name}</span>
            <button onClick={handleLogout} className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100">Login</Link>
            <Link to="/register" className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
