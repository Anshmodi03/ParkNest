import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import Header from "../Header/Header.jsx";
import Car from "../Car/car.jsx";
import ParkingSpotForm from "../Reserve/ParkingSpotForm.jsx";
import ParkingSpotList from "../View/ParkingSpotList.jsx";
import LoadingScreen from "./LoadingScreen.jsx";

const socket = io("https://parkme-server.onrender.com"); // Update with your deployed backend URL

const SlotsPage = ({ onNewEntry }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial occupied slots
  const fetchOccupiedSlots = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://parkme-server.onrender.com/api/spots"
      ); // Update with your backend URL
      const occupied = response.data
        .filter((spot) => spot.occupied)
        .map((spot) => spot.slotNumber);
      setOccupiedSlots(occupied);
    } catch (error) {
      console.error("Error fetching occupied slots:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle socket events
  useEffect(() => {
    fetchOccupiedSlots();

    socket.on("new_entry", (spot) => {
      setOccupiedSlots((prev) => [...prev, spot.slotNumber]);
    });

    socket.on("reservation_expired", (spot) => {
      setOccupiedSlots((prev) =>
        prev.filter((slot) => slot !== spot.slotNumber)
      );
    });

    socket.on("spot_deleted", () => {
      fetchOccupiedSlots(); // Refetch to ensure sync
    });

    return () => {
      socket.off("new_entry");
      socket.off("reservation_expired");
      socket.off("spot_deleted");
    };
  }, []);

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
        <div>
          <h1 className="text-white font-bold">Select a Parking Slot</h1>
          <Car
            occupiedSlots={occupiedSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />
        </div>
      ) : (
        <>
          <ParkingSpotForm
            onNewEntry={onNewEntry}
            initialSlotNumber={selectedSlot}
          />
          <ParkingSpotList />
        </>
      )}
    </div>
  );
};

export default SlotsPage;
