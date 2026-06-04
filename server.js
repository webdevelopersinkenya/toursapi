const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const tourRoutes = require("./routes/tours");
const bookingRoutes = require("./routes/bookings");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Tours API is running...");
});

// PORT setup (IMPORTANT FIX)
const PORT = process.env.PORT || 5000;

// MongoDB connection + server start
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err.message);
  });