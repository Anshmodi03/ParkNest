import React, { useState, useEffect } from "react";
import "../Reserve/ParkingSpotForm.css"; // Ensure styles match
import axios from "axios";

const NumberBoxes = ({ selectedSlot, onSelectSlot }) => {
  const [occupiedSlots, setOccupiedSlots] = useState([]);

  // Function to fetch occupied slots
  const fetchOccupiedSlots = async () => {
    try {
      const response = await axios.get(
        "https://parkme-server.onrender.com/api/spots"
      );
      const occupied = response.data
        .filter((spot) => spot.occupied)
        .map((spot) => spot.slotNumber);
      setOccupiedSlots(occupied);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  // Fetch occupied slots periodically
  useEffect(() => {
    fetchOccupiedSlots(); // Initial fetch

    const interval = setInterval(() => {
      fetchOccupiedSlots(); // Fetch slots every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 p-4 -m-1 mt-2">
        {[...Array(25)].map((_, index) => {
          const slotNumber = index + 1;
          const isOccupied = occupiedSlots.includes(slotNumber);
          const isSelected = selectedSlot === slotNumber;

          return (
            <div
              key={index}
              onClick={() => !isOccupied && onSelectSlot(slotNumber)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg shadow-md cursor-pointer transform transition-all duration-300 ease-in-out  
                ${
                  isOccupied
                    ? "bg-gray-800 text-white"
                    : isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-white text-green-800 hover:bg-green-400 hover:text-white hover:scale-110"
                }
                ${slotNumber === 25 ? "col-start-6  " : ""}`}
            >
              {slotNumber}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        /* Responsive alignment for slot 25 */
        @media (max-width: 768px) {
          .grid > div:nth-child(25) {
            grid-column: 1 !important; /* Align slot 25 to the first column */
          }
        }
      `}</style>
    </>
  );
};

export default NumberBoxes;
