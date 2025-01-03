// routes/parking.js
const express = require("express");
const router = express.Router();
const ParkingSpot = require("../models/ParkingSpot");
const Contact = require("../models/Contact");

module.exports = (io) => {
  // Get all parking spots
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
    const { slotNumber, vehicleNumber, userName, contactEmail } = req.body;

    // Check for duplicate entries
    try {
      const existingSpot = await ParkingSpot.findOne({
        $or: [{ vehicleNumber }, { userName }, { contactEmail }],
      });
      if (existingSpot) {
        return res.status(400).json({ error: "Duplicate entry" });
      }

      const spot = new ParkingSpot({
        slotNumber,
        vehicleNumber,
        userName,
        contactEmail,
        occupied: true,
        registrationDate: new Date(),
      });
      await spot.save();

      io.emit("new_entry", spot); // Emit new entry event to clients
      res.status(201).json(spot);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete a parking spot and prompt feedback
  router.delete("/spots/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSpot = await ParkingSpot.findByIdAndDelete(id);
      if (!deletedSpot) {
        return res.status(404).json({ message: "Spot not found" });
      }
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
