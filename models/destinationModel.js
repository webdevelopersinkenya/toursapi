const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Destination name is required"],
      trim: true,
      minlength: 2
    },

    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 10
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Destination", destinationSchema);