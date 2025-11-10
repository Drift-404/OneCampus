import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CampusConnect
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-600 transition ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/announcements"
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-600 transition ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Announcements
          </NavLink>
          <NavLink
            to="/clubs"
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-600 transition ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Clubs
          </NavLink>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition">
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-700"></span>
          <span className="w-6 h-0.5 bg-gray-700"></span>
          <span className="w-6 h-0.5 bg-gray-700"></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 flex flex-col items-center space-y-4 py-4 shadow-sm">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/announcements"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Announcements
          </NavLink>
          <NavLink
            to="/clubs"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Clubs
          </NavLink>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
