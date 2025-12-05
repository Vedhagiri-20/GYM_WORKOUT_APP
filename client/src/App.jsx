// src/App.jsx
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import MembershipPlans from "./pages/MembershipPlans";
import PersonalInfo from "./pages/PersonalInfo";           
import ClientAssessment from "./pages/ClientAssessment";
import WorkoutLog from "./pages/WorkoutLog";
import UserList from "./pages/UserList.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <div className="logo">FitFusion</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/assessment">Assessment</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/signup" className="nav-btn">Join Now</Link>
          <Link to="/users">Users</Link>

        </nav>
      </header>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plans" element={<MembershipPlans />} />
        <Route path="/signup" element={<PersonalInfo />} />         
        <Route path="/assessment" element={<ClientAssessment />} />
        <Route path="/workouts" element={<WorkoutLog />} />
        <Route path="/users" element={<UserList />} />

      </Routes>
    </BrowserRouter>
  );
}
