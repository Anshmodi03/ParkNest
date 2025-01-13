import React, { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../Header/Header";
import "./text.css"; // Import the CSS file here for styling

const DragCloseDrawerExample = React.lazy(() => import("../HowToUse/HowToUse"));

const HeroSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip state

  const handleBookClick = () => {
    navigate("/slots"); // Navigate to SlotsPage
  };

  const handleQuestionClick = () => {
    setOpen(true); // Open the "How to Use" modal
  };

  return (
    <section className="relative">
      <div className="relative bg-[url('./Dalle.png')] bg-cover bg-center bg-no-repeat flex flex-col items-start justify-start text-black p-15 imagebg">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="w-full relative z-10">
          <Header />
        </div>
        <div className="container mx-auto flex place-items-start flex-col p-8 mt-8 relative">
          <div className="wrapper">
            <svg>
              <text x="50%" y="50%" dy=".55em" textAnchor="middle">
                ParkNest
              </text>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold leading-relaxed md:leading-snug mb-2 text-white text-justify">
            <span className="text-gradient text-5xl font-bold">
              Smart Parking
            </span>
            <div className="rext">
              : Seamless Slots, <br />
              Instant Access
            </div>
          </h2>
          <p className="text-sm md:text-base text-white mb-4 text-justify ress">
            Effortlessly find available spots, park with ease, and enjoy a
            seamless, <br />
            stress-free experience every time.
          </p>
          <button className="btn" onClick={handleBookClick}>
            <span> Book Your Space </span>
          </button>
        </div>

        {/* Question Icon using Lord Icon */}
        <motion.div
          className="fixed bottom-8 right-8 z-50 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleQuestionClick}
          onMouseEnter={() => setShowTooltip(true)} // Show tooltip on hover
          onMouseLeave={() => setShowTooltip(false)} // Hide tooltip when not hovered
        >
          <lord-icon
            src="https://cdn.lordicon.com/lobpqdog.json"
            trigger="loop"
            colors="primary:#ffffff"
            style={{ width: "50px", height: "50px" }}
          />

          {/* Tooltip Popup */}
          {showTooltip && (
            <div className="absolute bottom-16 right-0 bg-black text-white p-2 rounded-md shadow-lg whitespace-nowrap">
              How to Book
            </div>
          )}
        </motion.div>
      </div>

      {/* "How to Use" Modal Drawer */}
      <Suspense fallback={<div>Loading...</div>}>
        <DragCloseDrawerExample open={open} setOpen={setOpen}>
          <div className="mx-auto max-w-2xl space-y-4 text-neutral-400">
            <h2 className="text-4xl text-center font-bold text-neutral-200">
              Booking a Parking Spot
            </h2>
            <ol className="list-decimal space-y-4 pl-4">
              <li>
                <strong>Log In:</strong> Use the login button at the top to log
                in or create an account for a personalized experience.
              </li>
              <li>
                <strong>Start Booking:</strong> Click on the{" "}
                <em>Book Your Space</em> button to proceed to the booking page.
              </li>
              <li>
                <strong>Select a Slot:</strong> Choose an available slot from
                the options displayed.
              </li>
              <li>
                <strong>Provide Details:</strong> Fill in the required details
                for reserving the parking spot.
              </li>
              <li>
                <strong>Set Booking Duration:</strong> Specify the duration of
                your booking in minutes.
              </li>
              <li>
                <strong>Confirm Reservation:</strong> Click on the{" "}
                <em>Reserve</em> button to confirm your booking.
              </li>
              <li>
                <strong>View Slot Details:</strong> Scroll down to check your
                slot number and reservation time.
              </li>
              <li>
                <strong>Download Confirmation:</strong> You can download the
                reservation details in image format.
              </li>
              <li>
                <strong>Auto Deletion After Expiry:</strong> Your reservation
                will be automatically removed after expiry.
              </li>
              <li>
                <strong>End Reservation:</strong> Manually end your reserved
                parking spot before the duration expires.
              </li>
            </ol>
          </div>
        </DragCloseDrawerExample>
      </Suspense>
    </section>
  );
};

export default HeroSection;
