const extractPDFText = require("../utils/pdfExtractor");
const db = require("../config/db");
const { analyzeResumeText } = require("../services/analysisService");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const userId = req.user.id;
    const filePath = req.file.path;
    const fileName = req.file.originalname;

    // 1. Save resume in DB
    const resumeSql = `
      INSERT INTO resumes (user_id, resume_name, file_path)
      VALUES (?, ?, ?)
    `;

    db.query(
      resumeSql,
      [userId, fileName, filePath],
      async (err, resumeResult) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Resume save failed",
          });
        }

        const resumeId = resumeResult.insertId;

        // 2. Extract PDF text
        const extractedText = await extractPDFText(filePath);

        // 3. Analyze resume
        const aiResult =
          await analyzeResumeText(extractedText);

        // 4. Save analysis result
        const analysisSql = `
          INSERT INTO resume_analysis
          (
            user_id,
            resume_id,
            score,
            role,
            skills,
            missing_skills,
            suggestions,
            summary
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
          analysisSql,
          [
            req.user.id,
            resumeId,
            aiResult.score,
            aiResult.role,
            JSON.stringify(aiResult.skills),
            JSON.stringify(aiResult.missing_skills),
            JSON.stringify(aiResult.suggestions),
            aiResult.summary,
          ],
          (err2, analysisResult) => {
            if (err2) {
              console.log(err2);

              return res.status(500).json({
                message: "Analysis save failed",
              });
            }

            return res.status(200).json({
              success: true,
              resumeId,
              analysisId:
                analysisResult.insertId,
              data: aiResult,
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Resume upload failed",
    });
  }
};