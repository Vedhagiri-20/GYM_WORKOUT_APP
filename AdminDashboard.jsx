import React from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="dashboard-container admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <nav className="dashboard-nav">
        <a className="dashboard-link" href="#metrics">Summary Metrics</a>
      </nav>
      <div className="dashboard-section">
        <ul>
          <li>Total Users: 200</li>
          <li>Active Workouts: 53</li>
          <li>Trainers: 5</li>
        </ul>
      </div>
    </div>
  );
}
export default AdminDashboard;
