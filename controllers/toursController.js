const { ObjectId } = require("mongodb");
const Tour = require("../models/tourModel");


// GET ALL TOURS
exports.getAllTours = async (req, res) => {
  try {
    const tours = await db.getDb().collection("tours").find().toArray();
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE TOUR
exports.getTourById = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const tour = await db.getDb().collection("tours").findOne({ _id: id });

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

    // VALIDATION
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

    const tour = {
      title,
      description,
      price,
      duration,
      destinationId
    };

    const result = await db.getDb().collection("tours").insertOne(tour);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TOUR
exports.updateTour = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const { title, description, price, duration, destinationId } = req.body;

    // VALIDATION
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

    const result = await db.getDb().collection("tours").updateOne(
      { _id: id },
      {
        $set: {
          title,
          description,
          price,
          duration,
          destinationId
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({ message: "Tour updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// DELETE TOUR
exports.deleteTour = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);

    const result = await db.getDb().collection("tours").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};