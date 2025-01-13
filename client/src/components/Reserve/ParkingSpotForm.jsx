import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { z } from "zod";
import ButtonWrapper from "./animatedsubmmit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./ParkingSpotForm.css";
import "./WaveGroup.css";
import "./FormTextStyles.css";

// Lazy load the NumberBoxes component
const NumberBoxes = React.lazy(() => import("../Slots/NumberBoxes"));

// Zod schema for validating the vehicle number format
const vehicleNumberSchema = z
  .string()
  .regex(
    /^[A-Z]{2}-\d{2}-[A-Z]{2}\d{4}$/,
    "Invalid vehicle number format. Example: MH-12-AB1234"
  )
  .min(10, "Vehicle number must be at least 10 characters long")
  .max(13, "Vehicle number must be at most 13 characters long");

// Modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ParkingSpotForm = ({ onNewEntry, initialSlotNumber = "" }) => {
  const [formData, setFormData] = useState({
    slotNumber: initialSlotNumber,
    vehicleNumber: "",
    userName: "",
    contactEmail: "",
    duration: "", // Added booking duration field
  });
  const [occupiedSlots, setOccupiedSlots] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchOccupiedSlots = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/spots");
        const occupied = response.data
          .filter((spot) => spot.occupied)
          .map((spot) => spot.slotNumber);
        setOccupiedSlots(occupied);
      } catch (err) {
        console.error("Error fetching spots:", err);
      }
    };
    fetchOccupiedSlots();
  }, [onNewEntry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectSlot = (slotNumber) => {
    setFormData({ ...formData, slotNumber });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate vehicle number using Zod schema
      const vehicleNumberValidation = vehicleNumberSchema.safeParse(
        formData.vehicleNumber
      );
      if (!vehicleNumberValidation.success) {
        setErrorMessage(vehicleNumberValidation.error.errors[0].message);
        return;
      }

      // If validation passes, proceed with form submission
      const response = await axios.post(
        "http://localhost:8000/api/reserve",
        formData
      );
      onNewEntry(response.data);
      setFormData({
        slotNumber: "",
        vehicleNumber: "",
        userName: "",
        contactEmail: "",
        duration: "", // Reset booking duration field
      });
      setErrorMessage(""); // Clear error on success
      handleOpen(); // Show success modal
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Error reserving spot");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title text-shadow-md text-3xl font-bold text-white -m-4">
        Reserve Your Parking Spot
      </h1>
      <form onSubmit={handleSubmit}>
        <Suspense fallback={<div>Loading slots...</div>}>
          <NumberBoxes
            occupiedSlots={occupiedSlots}
            selectedSlot={formData.slotNumber}
            onSelectSlot={handleSelectSlot}
          />
        </Suspense>

        {/* Vehicle Number Input */}
        <div className="wave-group">
          <input
            required
            type="text"
            className="input"
            name="vehicleNumber"
            placeholder=" "
            value={formData.vehicleNumber}
            onChange={handleChange}
          />
          <span className="bar"></span>
          <label className="label">
            {"Vehicle Number".split("").map((char, index) => (
              <span
                key={index}
                className="label-char"
                style={{ "--index": index }}
              >
                {char}
              </span>
            ))}
          </label>
        </div>
        {/* Display vehicle number validation error below the input */}
        {errorMessage && formData.vehicleNumber && (
          <p className="error text-red-500">{errorMessage}</p>
        )}

        {/* User Name Input */}
        <div className="wave-group">
          <input
            required
            type="text"
            className="input"
            name="userName"
            placeholder=" "
            value={formData.userName}
            onChange={handleChange}
          />
          <span className="bar"></span>
          <label className="label">
            {"User Name".split("").map((char, index) => (
              <span
                key={index}
                className="label-char"
                style={{ "--index": index }}
              >
                {char}
              </span>
            ))}
          </label>
        </div>

        {/* Contact Email Input */}
        <div className="wave-group">
          <input
            required
            type="email"
            className="input"
            name="contactEmail"
            placeholder=" "
            value={formData.contactEmail}
            onChange={handleChange}
          />
          <span className="bar"></span>
          <label className="label">
            {"Contact Email".split("").map((char, index) => (
              <span
                key={index}
                className="label-char"
                style={{ "--index": index }}
              >
                {char}
              </span>
            ))}
          </label>
        </div>

        {/* Booking Duration Input */}
        <div className="wave-group">
          <input
            required
            type="number"
            className="input"
            name="duration"
            placeholder=" "
            value={formData.duration}
            onChange={handleChange}
          />
          <span className="bar"></span>
          <label className="label">
            {"Booking Duration (minutes)".split("").map((char, index) => (
              <span
                key={index}
                className="label-char"
                style={{ "--index": index }}
              >
                {char}
              </span>
            ))}
          </label>
        </div>

        {/* Reserve Spot Button */}
        <ButtonWrapper />

        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>

      {/* Success Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            display: "flex", // Use flexbox for centering
            flexDirection: "column", // Align items vertically
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
            textAlign: "center", // Center text
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Success!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Parking Spot booked successfully!
          </Typography>
          <Button
            onClick={handleClose}
            sx={{
              mt: 2,
              border: "2px solid white", // White border
              backgroundColor: "black", // Black background
              color: "white", // White text
              "&:hover": {
                backgroundColor: "#333", // Darker background on hover
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ParkingSpotForm;
