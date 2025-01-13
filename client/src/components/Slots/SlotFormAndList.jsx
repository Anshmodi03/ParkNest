// SlotFormAndList.jsx
import React from "react";
import ParkingSpotForm from "../Reserve/ParkingSpotForm.jsx";
import ParkingSpotList from "../View/ParkingSpotList.jsx";

const SlotFormAndList = ({ onNewEntry, selectedSlot }) => (
  <>
    <ParkingSpotForm onNewEntry={onNewEntry} initialSlotNumber={selectedSlot} />
    <ParkingSpotList />
  </>
);

export default SlotFormAndList;
