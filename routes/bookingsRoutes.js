const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");
const { protect } = require("../middleware/authMiddleware");

// PUBLIC ROUTES
router.get("/", bookingsController.getAllBookings);
router.get("/:id", bookingsController.getBookingById);

// PROTECTED ROUTES
router.post("/", protect, bookingsController.createBooking);
router.put("/:id", protect, bookingsController.updateBooking);
router.delete("/:id", protect, bookingsController.deleteBooking);

module.exports = router;