import React, { Suspense, lazy } from "react";

// Lazy load the Header component
const Header = lazy(() => import("./Header"));

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
      <div className="bg-cover bg-center bg-fixed min-h-screen flex flex-col items-center py-12">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-6">
          <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center">
            <h1 className="text-5xl font-extrabold text-white mb-8">
              About Us
            </h1>
            <p className="text-lg text-indigo-200 mb-8 leading-relaxed">
              Parkme is the product of a Computer Science student's vision to
              transform urban parking. By leveraging modern web technologies,
              this platform provides an intuitive, efficient parking solution
              designed to ease the parking experience.
            </p>
          </div>

          {/* Mission, Vision, Impact Sections */}
          <Suspense
            fallback={
              <div className="text-center text-white">Loading Sections...</div>
            }
          >
            <Section
              title="Our Mission"
              description="To simplify parking by delivering a reliable, user-friendly platform that saves time, reduces stress, and enhances urban mobility."
            />
            <Section
              title="Our Vision"
              description="To expand Parkme as a leading smart parking solution, helping cities globally reduce congestion and improve mobility with innovative technology."
            />
            <Section
              title="Our Impact"
              description="Parkme aims to transform urban parking by improving efficiency, reducing congestion, and providing users with a hassle-free experience."
            />
          </Suspense>

          {/* Values, Teamwork, Customer Focus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-center col-span-1 md:col-span-2 xl:col-span-3">
            <Suspense
              fallback={
                <div className="text-center text-white">Loading Values...</div>
              }
            >
              <Section
                title="Our Values"
                description="We prioritize innovation, quality, and reliability, ensuring continuous improvement and delivering impactful solutions for users."
              />
              <Section
                title="Teamwork"
                description="While the development is led by a single developer, feedback and collaboration are vital to refining the platform and its features."
              />
              <Section
                title="Customer Focus"
                description="We are committed to enhancing user experience by continuously optimizing the platform based on real-world needs and feedback."
              />
            </Suspense>
          </div>

          {/* Developer Section */}
          <div className="col-span-1 md:col-span-2 xl:col-span-3 mt-16 text-center">
            <h2 className="text-2xl font-semibold text-white">
              Meet the Developer
            </h2>
            <p className="text-indigo-200 mt-4">
              As a Computer Science student, I am dedicated to leveraging my
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
  <div className="bg-white/10 p-6 rounded-lg shadow-lg">
    <h2 className="text-3xl font-semibold text-white mb-4">{title}</h2>
    <p className="text-indigo-200">{description}</p>
  </div>
);

export default AboutPage;
