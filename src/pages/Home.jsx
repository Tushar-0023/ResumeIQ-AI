import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Home.css";

function Home() {
  const scores = [78, 82, 87, 91, 85];

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "AI Engineer",
  ];

  const skills = [
    ["React", "Node.js", "MySQL"],
    ["Express.js", "MongoDB", "JWT"],
    ["JavaScript", "REST API", "SQL"],
    ["AI", "Python", "Machine Learning"],
  ];

  const [scoreIndex, setScoreIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScoreIndex((prev) => (prev + 1) % scores.length);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* NAV */}
      <div className="home-nav">
        <div className="logo">
          ResumeIQ <span>AI</span>
        </div>

        <div className="nav-actions">
          <Link to="/login">Login</Link>

          <Link to="/register" className="btn">
            Get Started
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-left">
          <h1>
            AI-Powered <span>Resume Analysis</span> for Modern Careers
          </h1>

          <p>
            Analyze your resume, discover skill gaps, get AI insights, and
            improve your chances of getting hired instantly.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Start Free
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="hero-right">
          <div className="glow"></div>

          <div className="card-preview">
            <h3>AI Resume Analysis</h3>

            <h1 className="dynamic-score">{scores[scoreIndex]} / 100</h1>

            <p className="role-text">{roles[roleIndex]}</p>

            <div className="skills-demo">
              {skills[roleIndex].map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>

            <p className="analysis-text">
              AI is analyzing resume quality, ATS score, skills, and profile
              fit...
            </p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <div className="feature">
          <h3>AI Resume Scoring</h3>
          <p>Instant score based on industry standards</p>
        </div>

        <div className="feature">
          <h3>Skill Gap Detection</h3>
          <p>Find missing skills for your target job</p>
        </div>

        <div className="feature">
          <h3>Smart Suggestions</h3>
          <p>AI-powered resume improvement tips</p>
        </div>
      </div>

      {/* CTA */}
      <div className="cta">
        <h2>Get hired faster with AI insights</h2>

        <Link to="/register">Create Free Account</Link>
      </div>

      {/* FOOTER */}
      <div className="footer">
        © 2026 ResumeIQ AI. Built for smarter careers.
      </div>
    </div>
  );
}

export default Home;
