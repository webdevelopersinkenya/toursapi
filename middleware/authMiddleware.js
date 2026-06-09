const jwt = require("jsonwebtoken");

/**
 * AUTH MIDDLEWARE (PROTECT ROUTES)
 */
const protect = (req, res, next) => {
  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("AUTH HEADER:", req.headers.authorization);

    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token invalid or expired"
    });
  }
};

module.exports = { protect };