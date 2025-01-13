import React, { Suspense, lazy } from "react";

// Lazy load the Header component
const Header = lazy(() => import("../Header/Header"));

const AboutPage = () => {
  return (
    <div
      className="bg-gradient-to-b from-indigo-600 to-purple-900 text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/Parkme_insdie.jpeg')",
      }}
    >
      <Suspense
        fallback={
          <div className="text-center text-white">Loading Header...</div>
        }
      >
        <Header />
      </Suspense>

      {/* Added padding-top to ensure content doesn't overlap with header */}
      <div className="bg-cover bg-center bg-fixed min-h-screen flex flex-col items-center pt-20 py-12">
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-6">
          <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center">
            <h1 className="text-5xl font-extrabold text-white mb-8">
              About Me
            </h1>
            <p className="text-lg text-indigo-200 mb-8 leading-relaxed">
              ParkNest is the product of my vision as a MERN Stack developer to
              transform urban parking. By leveraging modern web technologies, I
              aim to provide an intuitive, efficient parking solution designed
              to ease the parking experience.
            </p>
          </div>

          {/* Mission, Vision, Impact Sections */}
          <Suspense
            fallback={
              <div className="text-center text-white">Loading Sections...</div>
            }
          >
            <Section
              title="My Mission"
              description="To simplify parking by delivering a reliable, user-friendly platform that saves time, reduces stress, and enhances urban mobility."
            />
            <Section
              title="My Vision"
              description="To expand ParkNest as a leading smart parking solution, helping cities globally reduce congestion and improve mobility with innovative technology."
            />
            <Section
              title="My Impact"
              description="ParkNest aims to transform urban parking by improving efficiency, reducing congestion, and providing users with a hassle-free experience."
            />
          </Suspense>

          {/* Values, Focus, Commitment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-center col-span-1 md:col-span-2 xl:col-span-3">
            <Suspense
              fallback={
                <div className="text-center text-white">Loading Values...</div>
              }
            >
              <Section
                title="My Values"
                description="I prioritize innovation, quality, and reliability, ensuring continuous improvement and delivering impactful solutions for users."
              />
              <Section
                title="Focus"
                description="While this project is primarily developed by me, feedback and collaboration are vital in refining the platform and its features."
              />
              <Section
                title="Commitment"
                description="I am committed to enhancing the user experience by continuously optimizing the platform based on real-world needs and feedback."
              />
            </Suspense>
          </div>

          {/* Developer Section */}
          <div className="col-span-1 md:col-span-2 xl:col-span-3 mt-16 text-center">
            <h2 className="text-2xl font-semibold text-white">
              About the Developer
            </h2>
            <p className="text-indigo-200 mt-4">
              As a MERN Stack developer, I am dedicated to leveraging my
              technical skills to create practical, innovative solutions that
              improve daily life. This project reflects my commitment to smart
              technology and continuous learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, description }) => (
  <div className="bg-white/10 p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto">
    <h2 className="text-3xl font-semibold text-white mb-4">{title}</h2>
    <p className="text-indigo-200">{description}</p>
  </div>
);

export default AboutPage;
