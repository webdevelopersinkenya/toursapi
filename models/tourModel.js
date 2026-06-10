const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tour title is required"],
      trim: true,
      minlength: 3
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    },

    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 day"]
    },

    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: [true, "Destination is required"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Tour", tourSchema);