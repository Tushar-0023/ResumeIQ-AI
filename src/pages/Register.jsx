import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", formData);

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="brand-box">
          <h1>
            ResumeIQ <span>AI</span>
          </h1>

          <p className="brand-subtitle">
            Smart Resume Analysis & Career Insights
          </p>

          <div className="feature-box">
            <div className="feature-card">
              <h3>AI Resume Score</h3>
              <p>Analyze resume strength instantly</p>
            </div>

            <div className="feature-card">
              <h3>Skill Detection</h3>
              <p>Identify skills & missing gaps</p>
            </div>

            <div className="feature-card">
              <h3>Career Suggestions</h3>
              <p>Get smart recommendations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Create Account</h2>

          <p className="auth-text">Join ResumeIQ AI today</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group-custom">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group-custom">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group-custom">
              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              Register
            </button>
          </form>

          <p className="switch-auth">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
