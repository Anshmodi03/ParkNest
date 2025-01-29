const express = require("express");
const router = express.Router();
const ParkingSpot = require("../models/ParkingSpot");
const Contact = require("../models/Contact");
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  // Middleware to verify token
  const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

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

      // Save booking details to Booking model
      const booking = new Booking({
        slotNumber,
        vehicleNumber,
        userName,
        contactEmail,
        registrationDate: new Date(),
        expirationDate,
      });
      await booking.save();

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

  // Fetch all bookings with vehicle number visibility based on admin status
  router.get("/bookings", authenticate, async (req, res) => {
    try {
      const bookings = await Booking.find().sort({ registrationDate: -1 });

      if (req.user.isAdmin) {
        return res.status(200).json(bookings); // Admin can view full details
      }

      // Non-admin users see bookings without vehicle numbers
      const filteredBookings = bookings.map((booking) => {
        const { vehicleNumber, ...rest } = booking._doc;
        return rest;
      });

      res.status(200).json(filteredBookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
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

      // Mark related bookings as removedSlot
      await Booking.updateMany(
        { slotNumber: deletedSpot.slotNumber },
        { $set: { removedSlot: true } }
      );

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
