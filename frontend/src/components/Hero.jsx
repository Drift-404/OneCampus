import React from "react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      {/* Logo or small heading */}
      <div className="mb-6 text-indigo-600 font-semibold tracking-wide uppercase">
        OneCampus
      </div>

      {/* Main headline */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
        Simplify your{" "}
        <span className="text-indigo-600 animate-pulse">Campus Life</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
        A unified platform for all college events, clubs, exams, and opportunities — 
        everything that matters, all in one place.
      </p>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="#explore"
          className="px-8 py-3 rounded-full bg-indigo-600 text-white text-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md"
        >
          Explore
        </a>
        <a
          href="#join"
          className="px-8 py-3 rounded-full bg-white border border-indigo-600 text-indigo-600 text-lg font-medium hover:bg-indigo-50 transition duration-300"
        >
          Join Now
        </a>
      </div>

      {/* Decorative background or illustration */}
      <div className="mt-16">
        <img
          src="https://illustrations.popsy.co/gray/student-studying.svg"
          alt="Campus life illustration"
          className="w-80 md:w-96 mx-auto drop-shadow-xl transition-transform hover:scale-105"
        />
      </div>
    </section>
  );
}
