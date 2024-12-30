import React, { lazy, Suspense } from "react";
import "./car-base.css";
import "./car-slots.css";
import "./car-parts.css";
import "./car-status.css";

// Lazy load CarSlot component
const CarSlot = lazy(() => import("./CarSlot"));

function Car({ occupiedSlots, selectedSlot, onSelectSlot }) {
  return (
    <div className="grid grid-cols-5 gap-6 p-6">
      {/* 5x5 grid layout (25 slots) */}
      {[...Array(25)].map((_, index) => {
        const slotNumber = index + 1;
        const isOccupied = occupiedSlots.includes(slotNumber);
        const isSelected = selectedSlot === slotNumber;

        return (
          <Suspense fallback={<div>Loading Slot...</div>} key={index}>
            <CarSlot
              slotNumber={slotNumber}
              isOccupied={isOccupied}
              isSelected={isSelected}
              onSelectSlot={onSelectSlot}
            />
          </Suspense>
        );
      })}
    </div>
  );
}

export default Car;
