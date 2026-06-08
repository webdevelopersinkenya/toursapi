const express = require("express");
const router = express.Router();
const toursController = require("../controllers/toursController");
const { protect } = require("../middleware/authMiddleware");

// PUBLIC ROUTES
router.get("/", toursController.getAllTours);
router.get("/:id", toursController.getTourById);

// PROTECTED ROUTES
router.post("/", protect, toursController.createTour);
router.put("/:id", protect, toursController.updateTour);
router.delete("/:id", protect, toursController.deleteTour);

module.exports = router;