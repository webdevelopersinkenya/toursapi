const Tour = require("../models/tourModel");
console.log("TOUR MODEL FIELDS:", Object.keys(Tour.schema.obj));

// GET ALL TOURS
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE TOUR
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE TOUR
exports.createTour = async (req, res) => {
  try {
    const { title, description, price, duration, destinationId } = req.body;

    if (!title || !description || !price || !duration || !destinationId) {
      return res.status(400).json({
        message: "All fields (title, description, price, duration, destinationId) are required"
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0"
      });
    }

    const tour = await Tour.create({
      title,
      description,
      price,
      duration,
      destinationId
    });

    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TOUR
exports.updateTour = async (req, res) => {
  try {
    const { title, description, price, duration, destinationId } = req.body;

    if (!title || !description || !price || !duration || !destinationId) {
      return res.status(400).json({
        message: "All fields are required for update"
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0"
      });
    }

    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      { title, description, price, duration, destinationId },
      { new: true, runValidators: true }
    );

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TOUR
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};