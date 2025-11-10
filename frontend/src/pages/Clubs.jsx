import React from "react";

const clubs = [
  { name: "Robotics Club", desc: "Explore AI and robotics with hands-on projects." },
  { name: "Music Society", desc: "Join jam sessions, open mics, and concerts!" },
  { name: "Eco Club", desc: "Make campus greener with sustainability initiatives." },
];

export default function Clubs() {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Student Clubs</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {clubs.map((club, i) => (
          <div key={i} className="bg-white shadow p-4 rounded-lg border">
            <h3 className="font-semibold">{club.name}</h3>
            <p className="text-gray-600">{club.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
