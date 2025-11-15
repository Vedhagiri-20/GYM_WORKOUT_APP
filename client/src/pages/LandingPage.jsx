// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import "../App.css";
import "./LandingPage.css";


export default function LandingPage() {
  return (
    <div className="landing">
      {/* === NAVBAR === */}
      <header className="navbar">
        <div className="logo">🏋️ FitFusion</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#trainers">Trainers</a>
          <a href="#contact">Contact</a>
          {/* Join Now → goes to /plans */}
          <Link to="/plans">
            <button className="nav-btn">Join Now</button>
          </Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-heading">
            Sculpt Your Body, <br /> Elevate Your Spirit
          </h1>
      

          <Link to="/assessment">
            <button className="cta-btn">Let’s Start →</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
