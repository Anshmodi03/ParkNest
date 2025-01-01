import React, { useEffect, useState } from "react";
import axios from "axios";
import Car from "./car.jsx"; // Car component for initial slot selection
import ParkingSpotForm from "./ParkingSpotForm"; // Full parking form
import ParkingSpotList from "./ParkingSpotList";
import Header from "./Header";

const SlotsPage = ({ onNewEntry }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [occupiedSlots, setOccupiedSlots] = useState([]);

  useEffect(() => {
    const fetchOccupiedSlots = async () => {
      try {
        const response = await axios.get(
          "https://parkme-serverside.onrender.com/api/spots"
        );
        const occupied = response.data
          .filter((spot) => spot.occupied)
          .map((spot) => spot.slotNumber);
        setOccupiedSlots(occupied);
      } catch (error) {
        console.error("Error fetching occupied slots:", error);
      }
    };

    fetchOccupiedSlots();
  }, [onNewEntry]);

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

      {/* Show Car selection initially; switch to ParkingSpotForm after selection */}
      {!selectedSlot ? (
        <div>
          <h1 className="text-white font-bold">Select a Parking Slot</h1>
          <Car
            occupiedSlots={occupiedSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        </div>
      ) : (
        <ParkingSpotForm
          onNewEntry={onNewEntry}
          initialSlotNumber={selectedSlot}
        />
      )}

      {/* Show ParkingSpotList only after a slot has been selected */}
      {selectedSlot && <ParkingSpotList />}
    </div>
  );
};

export default SlotsPage;
