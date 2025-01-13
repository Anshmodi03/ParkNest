// SlotSelection.jsx
import React from "react";
import Car from "../Car/car.jsx";

const SlotSelection = ({ occupiedSlots, selectedSlot, onSelectSlot }) => (
  <div>
    <h1 className="text-white font-bold">Select a Parking Slot</h1>
    <Car
      occupiedSlots={occupiedSlots}
      selectedSlot={selectedSlot}
      onSelectSlot={onSelectSlot}
    />
  </div>
);

export default SlotSelection;
