import React, { useRef } from "react";
import html2canvas from "html2canvas";

const Popup = ({ spot, onClose }) => {
  const popupRef = useRef(null);

  const handleDownload = () => {
    if (popupRef.current) {
      html2canvas(popupRef.current, {
        backgroundColor: "#ffffff", // Ensure white background
        scale: 2, // Higher resolution for better quality
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `Parking_Details_Slot_${spot.slotNumber}.png`;
        link.click();
      });
    }
  };

  return (
    <div
      role="dialog"
      aria-labelledby="popupTitle"
      aria-hidden="false"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-500 opacity-0 animate-fadeIn border-black"
    >
      <div
        ref={popupRef}
        className="relative w-80 md:w-96 h-auto bg-white rounded-xl shadow-lg flex flex-col items-center p-6 transform transition-all duration-300 ease-in-out"
        role="document"
      >
        <h2
          id="popupTitle"
          className="text-3xl font-bold font-roboto text-center mb-4"
        >
          Parking Details
        </h2>
        <div className="text-m text-left w-full space-y-2">
          <p>
            <strong>Slot Number:</strong> {spot.slotNumber}
          </p>
          <p>
            <strong>Status:</strong> {spot.occupied ? "Occupied" : "Available"}
          </p>
          <p>
            <strong>Vehicle Number:</strong> {spot.vehicleNumber}
          </p>
          <p>
            <strong>User Name:</strong> {spot.userName}
          </p>
          <p>
            <strong>Email id:</strong> {spot.contactEmail}
          </p>
          <p>
            <strong>Registered on:</strong>{" "}
            {new Date(spot.registrationDate).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            className="bg-red-600 text-white px-4 py-1 rounded-full text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
