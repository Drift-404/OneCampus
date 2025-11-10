import React from "react";

const clubs = [
  { name: "Robotics Club", desc: "Explore AI and robotics with hands-on projects.", color: "bg-indigo-500", icon: "🤖" },
  { name: "Music Society", desc: "Join jam sessions, open mics, and concerts!", color: "bg-pink-500", icon: "🎵" },
  { name: "Eco Club", desc: "Make campus greener with sustainability initiatives.", color: "bg-green-500", icon: "🌱" },
  { name: "Drama Club", desc: "Act, direct, or produce plays and theater events.", color: "bg-yellow-500", icon: "🎭" },
  { name: "Coding Club", desc: "Build projects, compete in hackathons, and learn together.", color: "bg-blue-500", icon: "💻" },
];

export default function Clubs() {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Student Clubs
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {clubs.map((club, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-xl p-6 w-72 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center transform hover:-translate-y-2"
          >
            {/* Icon / Badge */}
            <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-xl mb-4 transform transition-transform duration-300 hover:scale-110 ${club.color}`}>
              {club.icon}
            </div>

            {/* Club Name */}
            <h3 className="font-semibold text-xl text-gray-800 mb-2">{club.name}</h3>

            {/* Club Description */}
            <p className="text-gray-600">{club.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
