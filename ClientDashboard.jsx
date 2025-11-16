import React from 'react';
import './ClientDashboard.css'; // Create this file if you want custom dashboard styles

function ClientDashboard() {
  return (
    <div className="dashboard-container client-dashboard">
      <h1 className="dashboard-title">Client Dashboard</h1>
      <nav className="dashboard-nav">
        <a className="dashboard-link" href="#profile">Profile</a>
        <a className="dashboard-link" href="#assessment">Assessment</a>
        <a className="dashboard-link" href="#workouts">Workouts</a>
      </nav>
      <div className="dashboard-section">
        <p>Welcome! Here you can manage your profile, view assessments, and keep track of your workouts.</p>
      </div>
    </div>
  );
}
export default ClientDashboard;
