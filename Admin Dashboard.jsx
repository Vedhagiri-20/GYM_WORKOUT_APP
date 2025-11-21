import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("activeUser");
    if (!stored) {
      navigate("/login");
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "admin") {
      navigate("/login");
      return;
    }
    setUser(parsed);
  }, [navigate]);

  return (
    <div className="admin-dashboard dashboard-container">
      <h2 className="dash-title">Welcome, {user?.email}</h2>
      <p className="dash-sub">Admin control panel</p>
      <div className="dash-grid">
        <button className="dash-card" onClick={() => navigate("/metrics")}>
          View Summary Metrics
        </button>
        <button className="dash-card" onClick={() => navigate("/users")}>
          User Management
        </button>
        <button
          className="dash-card logout"
          onClick={() => {
            localStorage.removeItem("activeUser");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
