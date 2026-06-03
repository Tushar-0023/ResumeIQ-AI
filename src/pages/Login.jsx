import { Link } from "react-router-dom";
import "../styles/Auth.css";
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
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
          <h2>Welcome Back</h2>
          <p className="auth-text">Login to continue your journey</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group-custom">
              <label>Email</label>
              <input type="email" name="email" onChange={handleChange} />{" "}
            </div>

            <div className="input-group-custom">
              <label>Password</label>
              <input type="password" name="password" onChange={handleChange} />
            </div>

            <button className="auth-btn" type="submit">
              Login
            </button>
          </form>

          <p className="switch-auth">
            Don't have an account?
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
