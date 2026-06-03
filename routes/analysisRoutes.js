const express = require("express");
const router = express.Router();

const { analyzeResume } = require("../controllers/analysisController");

router.post("/analyze", analyzeResume);

module.exports = router;