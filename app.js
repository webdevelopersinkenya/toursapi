const express = require("express");

const app = express();

app.use(express.json());

// routes
app.get("/api/tours", (req, res) => {
    res.status(200).json({
        message: "Tours route working"
    });
});

module.exports = app;