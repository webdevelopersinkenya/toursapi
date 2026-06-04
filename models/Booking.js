const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);