const { analyzeResumeText } = require("../services/analysisService");
const db = require("../config/db");

const analyzeResume = async (req, res) => {
  try {
    const { resumeText, userId, resumeId } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        message: "Resume text is required",
      });
    }

    const result = await analyzeResumeText(resumeText);

    const sql = `
      INSERT INTO resume_analysis 
      (user_id, resume_id, score, role, skills, missing_skills, suggestions, summary)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        userId,
        resumeId,
        result.score,
        result.role,
        JSON.stringify(result.skills),
        JSON.stringify(result.missing_skills),
        JSON.stringify(result.suggestions),
        result.summary
      ],
      (err, dbResult) => {
        if (err) {
          console.error("DB Save Error:", err);
          return res.status(500).json({ message: "DB save failed" });
        }

        return res.status(200).json({
          success: true,
          data: result,
          analysisId: dbResult.insertId
        });
      }
    );

  } catch (error) {
    console.error("❌ Analysis Error:", error);

    return res.status(500).json({
      message: "Analysis failed",
      error: error.message,
    });
  }
};

module.exports = { analyzeResume };