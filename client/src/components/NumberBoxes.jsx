import React from "react";
import "./ParkingSpotForm.css"; // Ensure styles match

const NumberBoxes = ({ occupiedSlots = [], selectedSlot, onSelectSlot }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 p-4 -m-3 mt-2">
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
                  ? "bg-gray-400 text-white"
                  : isSelected
                  ? "bg-blue-500 text-white"
                  : "bg-white text-green-500 hover:bg-green-500 hover:text-white hover:scale-110"
              }
              ${slotNumber === 25 ? "col-start-6 col-span-2 mx-auto" : ""}
            `}
          >
            {slotNumber}
          </div>
        );
      })}
    </div>
  );
};

export default NumberBoxes;
