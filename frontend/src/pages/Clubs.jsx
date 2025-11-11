import React, { useState } from "react";

const placeholderClubs = [
  { name: "Tech Club", theme: "Tech", description: "Coding, robotics, AI.", image: "https://picsum.photos/400/300?random=1" },
  { name: "Literature Club", theme: "Literature", description: "Books, poetry, writing.", image: "https://picsum.photos/400/300?random=2" },
  { name: "Sports Club", theme: "Sports", description: "Football, basketball, cricket.", image: "https://picsum.photos/400/300?random=3" },
  { name: "Art Club", theme: "Art", description: "Painting, sketches, sculpture.", image: "https://picsum.photos/400/300?random=4" },
  // add more clubs...
];

export default function Clubs() {
  const [filter, setFilter] = useState("All");

  const themes = ["All", "Tech", "Literature", "Sports", "Art"];

  const filteredClubs =
    filter === "All" ? placeholderClubs : placeholderClubs.filter((c) => c.theme === filter);

  return (
    <section className="py-12 px-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-8 text-center">
        Clubs & Societies
      </h1>

      {/* Filter */}
      <div className="flex justify-center gap-4 mb-10">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              filter === t
                ? "bg-indigo-600 text-white dark:bg-indigo-500 dark:text-gray-100"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Club cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredClubs.map((club, i) => (
          <div
            key={i}
            className="relative rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img src={club.image} alt={club.name} className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <h3 className="text-xl font-semibold text-white dark:text-gray-100">{club.name}</h3>
              <p className="text-gray-100 dark:text-gray-200 mt-2">{club.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
