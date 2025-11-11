import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 dark:opacity-100"
        style={{
          backgroundImage: "url('/nasa1.jpg')", // place this in public/
        }}
      ></div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 to-indigo-100/80 dark:from-gray-900/90 dark:to-indigo-950/80"></div>

      {/* Actual content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center justify-center text-center">
          <img
            src="/OClogo-removebg-preview.png"
            alt="OneCampus Logo"
            className="h-32 w-32 md:h-40 md:w-40 object-contain drop-shadow-lg hover:scale-110 transition-transform duration-300 mb-4"
          />
          <h2 className="text-2xl md:text-3xl font-semibold tracking-wide uppercase text-indigo-600 dark:text-indigo-400">
            OneCampus
          </h2>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Simplify your{" "}
          <span className="text-indigo-600 dark:text-indigo-400 animate-pulse">
            Campus Life
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
          A unified platform for all college events, clubs, exams, and opportunities — 
          everything that matters, all in one place.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/clubs"
            className="px-8 py-3 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white dark:text-gray-200 text-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-300 shadow-md"
          >
            Explore
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 rounded-full bg-white dark:bg-gray-700 border border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 text-lg font-medium hover:bg-indigo-50 dark:hover:bg-gray-600 transition duration-300"
          >
            Join Now
          </Link>
        </div>

        {/* Decorative image */}
        <div className="mt-16">
          <img
            src="/student-studying.svg"
            alt="Campus life illustration"
            className="w-80 md:w-96 mx-auto drop-shadow-xl transition-transform hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
