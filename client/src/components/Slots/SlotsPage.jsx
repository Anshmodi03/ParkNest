// SlotsPage.jsx
import React, { useState } from "react";
import useOccupiedSlots from "./useOccupiedSlots"; // Import custom hook
import Header from "../Header/Header.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import SlotSelection from "./SlotSelection.jsx";
import SlotFormAndList from "./SlotFormAndList.jsx";

const SlotsPage = ({ onNewEntry }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { occupiedSlots, loading } = useOccupiedSlots(); // Use custom hook

  const handleSelectSlot = (slotNumber) => {
    if (!occupiedSlots.includes(slotNumber)) {
      setSelectedSlot(slotNumber);
    }
  };

  return (
    <div
      className="slots-page-container"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/scrool-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Header className="text-white" />

      {loading ? (
        <LoadingScreen />
      ) : !selectedSlot ? (
        <SlotSelection
          occupiedSlots={occupiedSlots}
          selectedSlot={selectedSlot}
          onSelectSlot={handleSelectSlot}
        />
      ) : (
        <SlotFormAndList onNewEntry={onNewEntry} selectedSlot={selectedSlot} />
      )}
    </div>
  );
};

export default SlotsPage;
