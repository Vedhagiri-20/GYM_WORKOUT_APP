import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrainerDashboard.css";

export default function TrainerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("activeUser");
    if (!stored) {
      navigate("/login");
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "trainer") {
      navigate("/login");
      return;
    }
    setUser(parsed);
  }, [navigate]);

  return (
    <div className="trainer-dashboard dashboard-container">
      <h2 className="dash-title">Welcome, {user?.email}</h2>
      <p className="dash-sub">Your trainer workspace</p>
      <div className="dash-grid">
        <button className="dash-card" onClick={() => navigate("/clients")}>
          Client List
        </button>
        <button className="dash-card" onClick={() => navigate("/plans")}>
          Manage Workout Plans
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
