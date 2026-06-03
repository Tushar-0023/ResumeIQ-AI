const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { uploadResume } = require("../controllers/resumeController");

const router = express.Router();

const uploadDir = "uploads/";

// create folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

// pdf filter
const fileFilter = (req, file, cb) => {
  const fileType = path
    .extname(file.originalname)
    .toLowerCase();

  if (fileType === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

// =========================
// UPLOAD RESUME
// =========================
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  uploadResume
);

// =========================
// RESUME HISTORY API
// =========================
router.get("/history",authMiddleware, (req, res) => {
const userId = req.user.id;
  const sql = `
    SELECT
      r.id,
      r.resume_name,
      r.uploaded_at,
      a.score,
      a.role
    FROM resumes r
    LEFT JOIN resume_analysis a
    ON r.id = a.resume_id
    WHERE r.user_id = ?
    ORDER BY r.uploaded_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Failed to fetch history",
      });
    }

    res.status(200).json(results);
  });
});

// =========================
// DASHBOARD API
// =========================
router.get("/dashboard",authMiddleware, (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      COUNT(r.id) AS total_resumes,
      MAX(a.score) AS best_score,
      ROUND(AVG(a.score)) AS avg_score
    FROM resumes r
    LEFT JOIN resume_analysis a
    ON r.id = a.resume_id
    WHERE r.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Failed to fetch dashboard data",
      });
    }

    res.status(200).json(results[0]);
  });
});

// =========================
// LATEST ANALYSIS API
// =========================
router.get("/latest-analysis",authMiddleware, (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      score,
      role,
      skills,
      missing_skills,
      suggestions,
      summary
    FROM resume_analysis
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Failed to fetch latest analysis",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "No analysis found",
      });
    }

    const latest = results[0];

    res.status(200).json({
      ...latest,
      skills: Array.isArray(latest.skills)
  ? latest.skills
  : typeof latest.skills === "string"
  ? latest.skills.split(",")
  : [],

missing_skills: Array.isArray(
  latest.missing_skills
)
  ? latest.missing_skills
  : typeof latest.missing_skills === "string"
  ? latest.missing_skills.split(",")
  : [],

suggestions: Array.isArray(
  latest.suggestions
)
  ? latest.suggestions
  : typeof latest.suggestions === "string"
  ? latest.suggestions.split(",")
  : [],
    });
  });
});

module.exports = router;