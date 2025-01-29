const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  slotNumber: { type: Number, required: true }, // Slot where the booking was made
  vehicleNumber: { type: String, required: true },
  userName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  registrationDate: { type: Date, required: true, default: () => new Date() },
  expirationDate: { type: Date, required: true }, // Timestamp when the booking expires
  removedSlot: { type: Boolean, default: false }, // Indicates if the slot was removed
});

module.exports = mongoose.model("Booking", bookingSchema);
