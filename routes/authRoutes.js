const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../config/db");

const authController = require("../controllers/authController");

// =========================
// AUTH ROUTES
// =========================
router.post("/register", authController.register);
router.post("/login", authController.login);

// =========================
// PROFILE API
// =========================
router.get("/profile",  authMiddleware,(req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      u.name,
      u.email,
      COUNT(r.id) AS total_resumes,
      ROUND(AVG(a.score)) AS avg_score
    FROM users u
    LEFT JOIN resumes r
    ON u.id = r.user_id
    LEFT JOIN resume_analysis a
    ON r.id = a.resume_id
    WHERE u.id = ?
    GROUP BY u.id
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Failed to fetch profile",
      });
    }

    res.status(200).json(results[0]);
  });
});

module.exports = router;