import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero"; // keep this import if you plan to use elsewhere
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Announcements from "./pages/Announcements";
import Clubs from "./pages/Clubs";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/clubs" element={<Clubs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
