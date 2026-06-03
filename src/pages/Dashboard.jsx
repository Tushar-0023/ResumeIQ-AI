import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import axios from "axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_resumes: 0,
    avg_score: 0,
    best_score: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await API.get("/resume/dashboard");

      setStats(response.data);
    } catch (error) {
      console.log("Dashboard fetch error:", error);
    }
  };

  const handleLatestAnalysis = async () => {
    try {
      const response = await API.get("/resume/latest-analysis");

      navigate("/analysis", {
        state: response.data,
      });
    } catch (error) {
      console.log("Latest analysis error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* TOP BAR */}
      <div className="dash-nav">
        <div className="logo">
          ResumeIQ <span>AI</span>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* HERO */}
      <div className="dash-hero">
        <h1>Welcome Back 👋</h1>

        <p>
          Analyze your resume, track improvements, and get AI-powered career
          insights.
        </p>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h2>{stats.total_resumes || 0}</h2>
          <p>Resumes Uploaded</p>
        </div>

        <div className="stat-card">
          <h2>{stats.avg_score || 0}</h2>
          <p>Average Score</p>
        </div>

        <div className="stat-card">
          <h2>{stats.best_score || 0}</h2>
          <p>Best Score</p>
        </div>
      </div>

      {/* ACTION */}
      <div className="action-box">
        <h2>Start New Analysis</h2>

        <p>
          Upload your resume and get instant AI feedback with skill gap
          detection and improvement tips.
        </p>

        <button className="primary-btn" onClick={() => navigate("/upload")}>
          Upload Resume
        </button>
      </div>

      {/* QUICK LINKS */}
      <div className="quick-links">
        <div onClick={() => navigate("/history")} className="link-card">
          📄 Resume History
        </div>

        <div onClick={() => navigate("/profile")} className="link-card">
          👤 Profile
        </div>

        <div onClick={handleLatestAnalysis} className="link-card">
          📊 Latest Analysis
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
