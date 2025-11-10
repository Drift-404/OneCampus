import React from "react";
import Hero from "../components/Hero";


export default function Home() {
  return (  
    <div>
      <Hero
        brandText="OneCampus"
        title="Simplify your"
        highlightedText="Campus Life"
        subtitle="A unified platform for all college events, clubs, exams, and opportunities — everything that matters, all in one place."
        primaryCtaText="Explore"
        primaryCtaLink="/announcements" // Links to your Announcements page
        secondaryCtaText="Join Now"
        secondaryCtaLink="/register" // Links to your Register page
        imageSrc="https://illustrations.popsy.co/gray/student-studying.svg"
        imageAlt="Campus life illustration"
      />

    </div>
  );
}