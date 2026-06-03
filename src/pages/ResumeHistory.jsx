import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ResumeHistory.css";

function ResumeHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await API.get("/resume/history");

      setHistory(response.data);
    } catch (error) {
      console.log("History fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="loading-text">Loading...</h2>;
  }

  return (
    <div className="history-page">
      <div className="history-bg history-bg1"></div>
      <div className="history-bg history-bg2"></div>

      <div className="history-container">
        <h1 className="history-title">Resume History</h1>

        {history.length === 0 ? (
          <h3>No resumes uploaded yet</h3>
        ) : (
          <div className="history-grid">
            {history.map((resume) => (
              <div className="history-card" key={resume.id}>
                <h3>{resume.resume_name}</h3>

                <div className="score-pill">Score: {resume.score || 0}</div>

                <p className="role-text">
                  {resume.role || "Role not detected"}
                </p>

                <p className="date-text">
                  Uploaded: {new Date(resume.uploaded_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeHistory;
