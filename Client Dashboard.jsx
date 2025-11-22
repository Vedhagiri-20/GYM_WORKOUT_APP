import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientDashboard.css";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("activeUser");
    if (!stored) {
      navigate("/login");
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "client") {
      navigate("/login");
      return;
    }
    setUser(parsed);
  }, [navigate]);

  return (
    <div className="client-dashboard dashboard-container">
      <h2 className="dash-title">Welcome, {user?.email}</h2>
      <p className="dash-sub">Your personal fitness hub</p>
      <div className="dash-grid">
        <button className="dash-card" onClick={() => navigate("/assessment")}>
          Start / View Assessment
        </button>
        <button className="dash-card" onClick={() => navigate("/workouts")}>
          My Workouts
        </button>
        <button className="dash-card" onClick={() => navigate("/profile")}>
          My Profile
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
