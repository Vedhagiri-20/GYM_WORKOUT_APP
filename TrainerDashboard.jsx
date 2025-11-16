import React from 'react';
import './TrainerDashboard.css';

function TrainerDashboard() {
  return (
    <div className="dashboard-container trainer-dashboard">
      <h1 className="dashboard-title">Trainer Dashboard</h1>
      <nav className="dashboard-nav">
        <a className="dashboard-link" href="#clients">Client List</a>
      </nav>
      <div className="dashboard-section">
        <ul>
          <li>Client 1</li>
          <li>Client 2</li>
          <li>Client 3</li>
        </ul>
      </div>
    </div>
  );
}
export default TrainerDashboard;
