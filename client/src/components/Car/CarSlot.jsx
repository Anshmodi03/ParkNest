import React from "react";

function CarSlot({ slotNumber, isOccupied, isSelected, onSelectSlot }) {
  return (
    <div
      onClick={() => !isOccupied && onSelectSlot(slotNumber)}
      className={`car relative cursor-pointer transform transition-all duration-300 ease-in-out ${
        isOccupied
          ? "occupied" // Add red color for occupied slots
          : isSelected
          ? "selected scale-110"
          : "available hover:scale-110"
      }`}
    >
      {/* Hover Text (Occupied / Free) */}
      <div
        className={`status-text absolute inset-0 flex justify-center items-center text-white font-bold opacity-0 transition-opacity duration-300 ${
          isOccupied ? "occupied-text" : "free-text"
        }`}
      >
        {isOccupied ? "Occupied" : "Free"}
      </div>

      {/* Reflection and Slot Number */}
      <div className="reflection flex justify-center items-center">
        <h1 className="font-bold text-center mt-3 ml-2">{slotNumber}</h1>
      </div>
      <div className="window left"></div>
      <div className="window right"></div>
      <div className="wheel left"></div>
      <div className="wheel right"></div>
      <div className="headlight left"></div>
      <div className="headlight right"></div>
      <div className="taillight left"></div>
      <div className="taillight right"></div>
    </div>
  );
}

export default CarSlot;
