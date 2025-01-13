import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:8000"); // Update with your deployed backend URL

const useOccupiedSlots = () => {
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial occupied slots
  const fetchOccupiedSlots = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/spots"); // Update with your backend URL
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

  return { occupiedSlots, loading };
};

export default useOccupiedSlots;
