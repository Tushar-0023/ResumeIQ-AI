const analyzeResumeText = async (resumeText) => {
  try {
    const text = resumeText.toLowerCase();

    // ==========================
    // SKILL DATABASE
    // ==========================

    const skillCategories = {
      frontend: [
        "react",
        "html",
        "css",
        "javascript",
        "bootstrap",
        "tailwind",
        "next.js",
      ],

      backend: [
        "node.js",
        "express",
        "express.js",
        "mongodb",
        "mysql",
        "postgresql",
      ],

      ai_ml: [
        "python",
        "machine learning",
        "deep learning",
        "nlp",
        "artificial intelligence",
      ],

      core_cs: [
        "dsa",
        "data structure",
        "dbms",
        "computer network",
        "cloud computing",
      ],

      devops: [
        "docker",
        "aws",
        "kubernetes",
        "ci/cd",
        "testing",
        "deployment",
      ],
    };

    // ==========================
    // DETECT SKILLS
    // ==========================

    let foundSkills = [];

    Object.values(skillCategories).forEach((skills) => {
      skills.forEach((skill) => {
        if (text.includes(skill.toLowerCase())) {
          foundSkills.push(skill);
        }
      });
    });

    foundSkills = [...new Set(foundSkills)];

    // ==========================
    // ROLE DETECTION
    // ==========================

    let role = "General Software Developer";

    if (
      foundSkills.includes("react") &&
      foundSkills.includes("node.js")
    ) {
      role = "MERN Stack Developer";
    }

    if (
      foundSkills.includes("machine learning") ||
      foundSkills.includes("python")
    ) {
      role += " + AI/ML";
    }

    // ==========================
    // MISSING SKILLS
    // ==========================

    const roleSkills = {
      "MERN Stack Developer": [
        "react",
        "node.js",
        "express.js",
        "mongodb",
        "mysql",
        "docker",
        "aws",
        "testing",
      ],
    };

    let missingSkills = [];

    const expectedSkills =
      roleSkills["MERN Stack Developer"] || [];

    missingSkills = expectedSkills.filter(
      (skill) => !foundSkills.includes(skill)
    );

    // ==========================
    // SCORING SYSTEM
    // ==========================

    let score = 45;

// skills contribution
score += foundSkills.length * 1;

// strong sections
if (text.includes("project")) score += 8;
if (text.includes("github")) score += 4;
if (text.includes("linkedin")) score += 4;
if (text.includes("education")) score += 4;

// project quality bonus
if (text.includes("react")) score += 3;
if (text.includes("node")) score += 3;
if (text.includes("machine learning")) score += 3;

// penalties
score -= missingSkills.length * 4;

// fresher balancing
if (!text.includes("internship")) {
  score -= 7;
}

// clamp
score = Math.max(45, Math.min(score, 90));
score = Math.round(score);

    // ==========================
    // SUGGESTIONS
    // ==========================

    let suggestions = [];

    if (!text.includes("achievement")) {
      suggestions.push(
        "Add measurable achievements in projects"
      );
    }

    if (!text.includes("deployment")) {
      suggestions.push(
        "Add deployed project links if available"
      );
    }

    if (missingSkills.includes("docker")) {
      suggestions.push(
        "Learn Docker to strengthen backend profile"
      );
    }

    if (missingSkills.includes("aws")) {
      suggestions.push(
        "Learn AWS or cloud basics"
      );
    }

    if (suggestions.length === 0) {
      suggestions.push(
        "Resume looks good. Keep improving projects and skills."
      );
    }

    // ==========================
    // SUMMARY
    // ==========================

    const summary = `Strong ${role} profile with ${foundSkills.length} technical skills detected. Resume shows good project exposure and technical foundation, but can be improved with stronger project impact, deployment, and additional industry tools.`;

    return {
      score,
      role,
      skills: foundSkills,
      missing_skills: missingSkills,
      summary,
      suggestions,
    };
  } catch (error) {
    console.error(error);

    return {
      score: 0,
      role: "Unknown",
      skills: [],
      missing_skills: [],
      summary: "Resume analysis failed",
      suggestions: ["Try again"],
    };
  }
};

module.exports = { analyzeResumeText };