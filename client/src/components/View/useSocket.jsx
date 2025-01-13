import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://parkme-server.onrender.com");

const useSocket = (setSpots, addNotification) => {
  useEffect(() => {
    socket.on("new_entry", (newSpot) => {
      setSpots((prevSpots) => [...prevSpots, newSpot]);
    });

    socket.on("reservation_expired", (expiredSpot) => {
      setSpots((prevSpots) =>
        prevSpots.filter((spot) => spot._id !== expiredSpot._id)
      );
      addNotification(`Slot ${expiredSpot.slotNumber} is now available!`);
    });

    return () => {
      socket.off("new_entry");
      socket.off("reservation_expired");
    };
  }, [setSpots, addNotification]);
};

export default useSocket;
