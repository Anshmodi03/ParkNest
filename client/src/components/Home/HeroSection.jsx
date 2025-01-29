import React, { useState, useEffect, Suspense } from "react"; // Added `useEffect`
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHistory } from "react-icons/fa"; // Import history icon
import { toast } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import Header from "../Header/Header";
import "./text.css"; // Import the CSS file here for styling
import axios from "axios";

const DragCloseDrawerExample = React.lazy(() => import("../HowToUse/HowToUse"));

const HeroSection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(""); // Tooltip state
  const [showHistory, setShowHistory] = useState(false); // History modal state
  const [history, setHistory] = useState([]); // History data
  const [isAdmin, setIsAdmin] = useState(false); // Admin state

  useEffect(() => {
    // Check if the user is an admin
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  const handleBookClick = () => {
    navigate("/slots"); // Navigate to SlotsPage
  };

  const handleQuestionClick = () => {
    setOpen(true); // Open the "How to Use" modal
  };

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const response = await axios.get(
        "https://parkme-server.onrender.com/api/bookings",
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token in the request
        }
      );
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleHistoryClick = () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      toast.warn("Please log in to view booking history!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "dark",
        style: { backgroundColor: "rgba(255, 165, 0, 0.7)" },
      });
      return;
    }

    fetchHistory(); // Fetch history when the button is clicked
    setShowHistory(true); // Show the history modal
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

        {/* History Icon */}
        <motion.div
          className="fixed bottom-8 right-20 z-50 cursor-pointer text-white flex items-center gap-2 bg-transparent p-2 rounded-full shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleHistoryClick}
          onMouseEnter={() => setShowTooltip("View History")} // Show "View History" tooltip on hover
          onMouseLeave={() => setShowTooltip("")} // Hide tooltip when not hovered
        >
          <FaHistory size={35} /> {/* Reduced icon size */}
          {showTooltip === "View History" && (
            <div className="absolute bottom-16 bg-black text-white p-2 rounded-md shadow-lg whitespace-nowrap">
              {showTooltip}
            </div>
          )}
        </motion.div>

        {/* Question Icon using Lord Icon */}
        <motion.div
          className="fixed bottom-8 right-8 z-50 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleQuestionClick}
          onMouseEnter={() => setShowTooltip("How to Book")} // Show "How to Book" tooltip on hover
          onMouseLeave={() => setShowTooltip("")} // Hide tooltip when not hovered
        >
          <lord-icon
            src="https://cdn.lordicon.com/lobpqdog.json"
            trigger="loop"
            colors="primary:#ffffff"
            style={{ width: "40px", height: "40px" }} // Reduced size
          />
          {showTooltip === "How to Book" && (
            <div className="absolute bottom-16 right-0 bg-black text-white p-2 rounded-md shadow-lg whitespace-nowrap">
              {showTooltip}
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
              {/* Instructions */}
            </ol>
          </div>
        </DragCloseDrawerExample>
      </Suspense>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Booking History</h2>
            {history.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto space-y-3">
                {/* Scrollable container */}
                <ul>
                  {history.map((item) => (
                    <li
                      key={item._id}
                      className="border border-gray-300 p-3 rounded-md"
                    >
                      <p>
                        <strong>Slot:</strong> {item.slotNumber}
                      </p>
                      {isAdmin && (
                        <p>
                          <strong>Vehicle:</strong> {item.vehicleNumber}
                        </p>
                      )}
                      <p>
                        <strong>User:</strong> {item.userName}
                      </p>
                      <p>
                        <strong>Booked At:</strong>{" "}
                        {new Date(item.registrationDate).toLocaleString()}
                      </p>
                      <p>
                        <strong>Expires At:</strong>{" "}
                        {new Date(item.expirationDate).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No booking history available.</p>
            )}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowHistory(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
