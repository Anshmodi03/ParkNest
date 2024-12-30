// server/models/ParkingSpot.js
const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema({
  slotNumber: { type: Number, required: true, unique: true },
  vehicleNumber: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  contactEmail: { type: String, required: true, unique: true },
  occupied: { type: Boolean, default: false },
  registrationDate: { type: Date, default: () => new Date() }, // New field for timestamp
});

module.exports = mongoose.model("ParkingSpot", parkingSpotSchema);
