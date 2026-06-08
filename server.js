const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Routes
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const bookingRoutes = require("./routes/bookingsRoutes");
const tourRoutes = require("./routes/toursRoutes");
const destinationsRoutes = require("./routes/destinationsRoutes");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/destinations", destinationsRoutes);

// Home
app.get("/", (req, res) => {
  res.send("Tours API is running...");
});

// PORT
const PORT = process.env.PORT || 5000;

// DB + Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:5000`);
    });
  })
  .catch((err) => {
    console.log("Database connection error:", err.message);
  });