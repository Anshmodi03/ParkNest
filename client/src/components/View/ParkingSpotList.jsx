import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification"; // Importing the notification component
import useSocket from "./useSocket"; // Importing custom socket hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faX } from "@fortawesome/free-solid-svg-icons"; // Import faX icon
const Popup = React.lazy(() => import("./Popup")); // Lazy load Popup component
const SpringModal = React.lazy(() => import("./SpringModal")); // Lazy load SpringModal component

const ParkingSpotList = () => {
  const [spots, setSpots] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spotToDelete, setSpotToDelete] = useState(null);
  const [notifications, setNotifications] = useState([]); // Custom notification state
  const navigate = useNavigate();

  // Fetch spots from the backend
  const fetchSpots = async () => {
    const response = await axios.get(
      "https://parkme-server.onrender.com/api/spots"
    );
    setSpots(response.data);
  };

  // Function to add notifications
  const addNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 2000);
  };

  // Fetch the spots and set up socket listeners
  useEffect(() => {
    fetchSpots();
  }, []);

  // Use the custom socket hook
  useSocket(setSpots, addNotification);

  const handleButtonClick = (spot) => {
    setSelectedSpot(spot);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedSpot(null);
  };

  const openDeleteModal = (spotId) => {
    setSpotToDelete(spotId);
    setIsModalOpen(true);
  };

  const handleDeleteSpot = async () => {
    try {
      await axios.delete(
        `https://parkme-server.onrender.com/api/spots/${spotToDelete}`
      );
      setSpots((prevSpots) =>
        prevSpots.filter((spot) => spot._id !== spotToDelete)
      );
      setIsModalOpen(false);
      setSpotToDelete(null);
      navigate("/");
    } catch (error) {
      console.error("Error deleting spot:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6 relative">
      {/* Custom Notifications */}
      <Notification notifications={notifications} />

      {spots.map((spot) => (
        <div
          key={spot.slotNumber}
          className={`flex flex-col items-center bg-black/50 rounded-3xl shadow-lg p-6 w-64 transform transition-all duration-300 ${
            spot.occupied ? "opacity-100" : "hover:scale-105"
          }`}
        >
          <div className="text-center">
            <h3 className="text-xl font-medium text-white">
              Slot {spot.slotNumber}
            </h3>
            <p className="mt-2 text-sm text-gray-200">
              {spot.occupied ? "Occupied" : "Available"}
            </p>
            <p className="mt-1 text-sm text-white font-semibold">
              Registered on:{" "}
              {new Date(spot.registrationDate).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-6 w-full flex flex-col items-center space-y-4">
            <FontAwesomeIcon
              icon={faX}
              onClick={() => openDeleteModal(spot._id)}
              className="text-red-900 cursor-pointer w-4 h-4 hover:text-red-700 text-lg font-bold rounded-full border-2 border-red-500 p-1"
              size="sm"
            />

            <button
              className="w-full px-6 py-2.5 text-center text-black bg-white border-2 border-white rounded-full text-sm hover:bg-transparent hover:text-white transition duration-200"
              onClick={() => handleButtonClick(spot)}
            >
              {spot.occupied ? "View Details" : "Reserve Now"}
            </button>
          </div>
        </div>
      ))}
      {isPopupOpen && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Popup spot={selectedSpot} onClose={closePopup} />
        </React.Suspense>
      )}
      {isModalOpen && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <SpringModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onConfirm={handleDeleteSpot}
            message="Are you sure you want to delete this parking spot?"
          />
        </React.Suspense>
      )}
    </div>
  );
};

export default ParkingSpotList;
