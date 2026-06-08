const jwt = require("jsonwebtoken");

/**
 * AUTH MIDDLEWARE (PROTECT ROUTES)
 * Checks if user has a valid JWT token
 */
const protect = (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // No token found
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing"
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token invalid or expired"
    });
  }
};

module.exports = { protect };