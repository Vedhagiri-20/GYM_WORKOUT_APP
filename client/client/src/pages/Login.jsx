// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

/* ⭐ Import the video (same as other pages) */
import gymVideo from "../assets/GYM_BG.mp4";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const staffUsers = [
    { email: "trainer@gym.com", password: "trainer123", role: "trainer" },
    { email: "admin@gym.com", password: "admin123", role: "admin" },
    { email: "client@gym.com", password: "123", role: "client" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("invalid");
      return;
    }

    const match = staffUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (match) {
      const activeUser = { email: match.email, role: match.role };
      localStorage.setItem("activeUser", JSON.stringify(activeUser));

      if (match.role === "trainer") navigate("/trainer/dashboard");
      if (match.role === "admin") navigate("/admin/dashboard");
      if (match.role === "client") navigate("/client/dashboard");
      return;
    }

    const savedProfileJson = localStorage.getItem("userProfile");
    if (savedProfileJson) {
      const profile = JSON.parse(savedProfileJson);

      if (profile.email === email && password === "123456") {
        const activeUser = { email: profile.email, role: "client" };
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        navigate("/client/dashboard");
        return;
      }
    }

    setError("not-found");
  };

  return (
    <div className="login-wrapper">

      {/* Background Video */}
      <video className="login-bg-video" autoPlay loop muted playsInline>
        <source src={gymVideo} type="video/mp4" />
      </video>

      {/* Video dark overlay */}
      <div className="login-overlay" />

      {/* Login Form Container */}
      <div className="login-page">

        <h2 className="login-title">Login</h2>
        <p className="login-subtext">Consistency builds champions. Log in to stay committed.</p>

        <form className="login-card" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error === "invalid" && (
            <p className="error-text">Please enter email and password.</p>
          )}

          {error === "not-found" && (
            <div className="signup-box">
              <p>No account found with this email.</p>
              <button
                className="signup-btn"
                type="button"
                onClick={() => navigate("/plans")}
              >
                Sign Up
              </button>
            </div>
          )}

          <button type="submit" className="login-btn">Log In</button>
        </form>

        <div className="login-helper">
          <p><strong>Test accounts (demo only):</strong></p>
          <p>Trainer → trainer@gym.com / trainer123</p>
          <p>Admin → admin@gym.com / admin123</p>
          <p>Client → client@gym.com / 123</p>
        </div>
        
      </div>
    </div>
  );
}
