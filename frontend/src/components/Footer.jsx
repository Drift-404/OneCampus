import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-4 text-center">
      <p>© {new Date().getFullYear()} OneCampus. Built with ❤️ using MERN.</p>
    </footer>
  );
}
