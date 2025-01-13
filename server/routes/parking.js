const express = require("express");
const router = express.Router();
const ParkingSpot = require("../models/ParkingSpot");
const Contact = require("../models/Contact");

module.exports = (io) => {
  // Get all parking spots with WebSocket support
  router.get("/spots", async (req, res) => {
    try {
      const spots = await ParkingSpot.find();
      res.json(spots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Reserve a parking spot
  router.post("/reserve", async (req, res) => {
    const { slotNumber, vehicleNumber, userName, contactEmail, duration } =
      req.body;

    try {
      // Check for duplicate entries
      const existingSpot = await ParkingSpot.findOne({
        $or: [{ vehicleNumber }, { userName }, { contactEmail }],
      });
      if (existingSpot) {
        return res.status(400).json({ error: "Duplicate entry" });
      }

      const expirationDate = new Date(Date.now() + duration * 60 * 1000); // Convert duration (in minutes) to milliseconds

      const spot = new ParkingSpot({
        slotNumber,
        vehicleNumber,
        userName,
        contactEmail,
        occupied: true,
        registrationDate: new Date(),
        expirationDate,
      });

      await spot.save();

      // Notify all connected clients of the new reservation
      io.emit("new_entry", spot);

      // Automatically delete the reservation after the duration expires
      setTimeout(async () => {
        try {
          const expiredSpot = await ParkingSpot.findByIdAndDelete(spot._id);
          if (expiredSpot) {
            io.emit("reservation_expired", expiredSpot); // Notify clients
          }
        } catch (error) {
          console.error("Error deleting expired reservation:", error);
        }
      }, duration * 60 * 1000);

      res.status(201).json(spot);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete a parking spot
  router.delete("/spots/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSpot = await ParkingSpot.findByIdAndDelete(id);
      if (!deletedSpot) {
        return res.status(404).json({ message: "Spot not found" });
      }

      // Notify all connected clients of the deletion
      io.emit("spot_deleted", { id });
      res.status(200).json({ message: "Spot deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Contact Us route
  router.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        message,
      });

      await newContact.save();
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  return router;
};
