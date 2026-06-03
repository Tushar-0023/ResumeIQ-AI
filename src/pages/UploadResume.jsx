import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/UploadResume.css";

function UploadResume() {
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    console.log("Upload button clicked");

    if (!resume) {
      setMessage("Please select a PDF resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      console.log("Sending request...");

      const response = await api.post("/resume/upload", formData);

      console.log("AI RESULT:", response.data);

      navigate("/analysis", {
        state: response.data.data,
      });
    } catch (error) {
      console.log("UPLOAD ERROR:");
      console.log(error);

      setMessage("Upload failed");
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-card">
          <h1>📄 Upload Resume</h1>

          <p>
            Upload your resume and get AI-powered analysis, skill gap detection,
            and smart improvement suggestions.
          </p>

          <form onSubmit={handleUpload}>
            <div className="file-box">
              <input type="file" accept=".pdf" onChange={handleFileChange} />
            </div>

            <button type="submit" className="upload-btn">
              Upload Resume
            </button>
          </form>

          {message && <p className="upload-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default UploadResume;
