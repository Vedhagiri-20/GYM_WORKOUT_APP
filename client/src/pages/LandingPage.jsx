import { Link } from "react-router-dom";
import "../App.css";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">

      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-heading">
            Sculpt Your Body, <br /> Elevate Your Spirit
          </h1>

          
          <Link to="/login">
            <button className="cta-btn">Let’s Start →</button>
          </Link>
        </div>
      </section>
    </div>
  );
}
