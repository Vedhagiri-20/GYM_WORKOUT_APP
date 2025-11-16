// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded demo users for testing
  const staffUsers = [
    { email: "trainer@gym.com", password: "trainer123", role: "trainer" },
    { email: "admin@gym.com", password: "admin123", role: "admin" },
    { email: "client@gym.com", password: "123", role: "client" }, // test client
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("invalid");
      return;
    }

    // 1. Check hardcoded trainer/admin/client list
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

    // 2. Optional: Check client created from PersonalInfo signup
    const savedProfileJson = localStorage.getItem("userProfile");
    if (savedProfileJson) {
      const profile = JSON.parse(savedProfileJson);

      // Simple password rule for now
      if (profile.email === email && password === "123456") {
        const activeUser = { email: profile.email, role: "client" };
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        navigate("/client/dashboard");
        return;
      }
    }

    // 3. If no match → show signup prompt
    setError("not-found");
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Login</h2>
      <p className="login-subtitle">
        Use your email and password to access your dashboard.
      </p>

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

        {/* ERROR HANDLING */}
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

        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>

      <div className="login-helper">
        <p><strong>Test accounts (demo only):</strong></p>
        <p>Trainer → trainer@gym.com / trainer123</p>
        <p>Admin → admin@gym.com / admin123</p>
        <p>Client → client@gym.com / 123</p>
       
      </div>
    </div>
  );
}
