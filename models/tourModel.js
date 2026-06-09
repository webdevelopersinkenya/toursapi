const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tour name is required"],
      trim: true,
      minlength: 3
    },

    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Tour", tourSchema);