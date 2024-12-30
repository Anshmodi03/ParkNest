// HeroSection.jsx
import React from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./text.css";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate("/slots"); // Navigate to SlotsPage
  };

  return (
    <section className="relative">
      <div
        className="relative bg-[url('./Dalle.png')] bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-start justify-start text-black p-15"
        style={{
          width: "98.93vw",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="w-full relative z-10">
          <Header />
        </div>
        <div className="container mx-auto flex place-items-start flex-col p-8 mt-8 relative z-10">
          <div className="wrapper">
            <svg>
              <text x="50%" y="50%" dy=".55em" textAnchor="middle">
                ParkMe
              </text>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold leading-relaxed md:leading-snug mb-2 text-white text-justify">
            <span className="text-gradient text-4x4 font-bold">
              Smart Parking
            </span>
            : Seamless Slots, <br />
            Instant Access
          </h2>
          <p className="text-sm md:text-base text-white mb-4 text-justify">
            Effortlessly find available spots, park with ease, and enjoy a
            seamless, <br />
            stress-free experience every time.
          </p>
          <button onClick={handleBookClick}>
            <span> Book Your Space </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
