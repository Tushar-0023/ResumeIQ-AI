const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey"
    );

    // normalize user object (VERY IMPORTANT)
    req.user = {
      id: decoded.id || decoded.userId,
      email: decoded.email,
    };

    if (!req.user.id) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;