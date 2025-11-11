import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  // Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">OneCampus</Link>

      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/clubs">Clubs</Link>
        <Link to="/announcements">Announcements</Link>

        {name && role === "ADMIN" && (
          <span className="bg-yellow-400 text-gray-800 px-2 py-1 rounded">ADMIN</span>
        )}

        {name ? (
          <>
            <span>{name}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100">
              Login
            </Link>
            <Link to="/register" className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100">
              Register
            </Link>
          </>
        )}

        {/* Animated Dark Mode Toggle */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="relative w-12 h-6 rounded-full p-1 cursor-pointer bg-gray-200 dark:bg-gray-700 transition-colors"
        >
          {/* Circle */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-yellow-400 rounded-full shadow-md transform transition-transform duration-300 ${
              darkMode ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {/* Icon inside the circle */}
            {darkMode ? (
              <FaMoon className="w-3 h-3 text-gray-800 m-auto mt-0.5" />
            ) : (
              <FaSun className="w-3 h-3 text-yellow-400 m-auto mt-0.5" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
