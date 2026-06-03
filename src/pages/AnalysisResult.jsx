import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AnalysisResult.css";

function AnalysisResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  if (!result) {
    return (
      <div className="empty-page">
        <h2>No analysis data found</h2>

        <button className="go-back-btn" onClick={() => navigate("/upload")}>
          Upload Resume
        </button>
      </div>
    );
  }

  return (
    <div className="analysis-wrapper">
      {/* BACKGROUND GLOW */}
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      <div className="analysis-container">
        {/* HERO SECTION */}
        <div className="hero-card">
          <div className="score-box">
            <div className="score-ring">
              <h1>{result.score}</h1>
              <span>/100</span>
            </div>
          </div>

          <div className="hero-content">
            <h1>Resume Analysis</h1>

            <p className="role-badge">{result.role}</p>

            <p className="hero-text">
              AI-powered resume insights generated based on skills, projects,
              profile fit, and resume quality.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="analysis-grid">
          {/* SUMMARY */}
          <div className="glass-card">
            <h3>Summary</h3>
            <p>{result.summary}</p>
          </div>

          {/* SKILLS */}
          <div className="glass-card">
            <h3>Skills Found</h3>

            <div className="skills-container">
              {result.skills.map((skill, index) => (
                <span key={index} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* MISSING */}
          <div className="glass-card">
            <h3>Missing Skills</h3>

            <div className="skills-container">
              {result.missing_skills.map((skill, index) => (
                <span key={index} className="missing-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* SUGGESTIONS */}
          <div className="glass-card full-width">
            <h3>Suggestions</h3>

            <ul>
              {result.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResult;
