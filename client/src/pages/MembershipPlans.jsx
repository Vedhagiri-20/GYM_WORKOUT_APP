// src/pages/MembershipPlans.jsx
import { useNavigate } from "react-router-dom";
import "./MembershipPlans.css";

export default function MembershipPlans() {
  const navigate = useNavigate();

  const choosePlan = (plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    // also pass via router state (handy during this session)
    navigate("/signup", { state: { plan } });
  };

  return (
    <div className="plans-page">
      <h2 className="plans-heading">
        FLEXIBLE <span className="highlight">PLANS</span> FOR EVERY GOAL
      </h2>
      <p className="plans-subtext">
        Choose the membership that matches your fitness ambitions.
      </p>

      <div className="plans-container">
        <div className="plan-card">
          <h3>Basic</h3>
          <p className="price">$25<span>/month</span></p>
          <p className="plan-desc">Essential package for regular workouts.</p>

          <h4 className="features-title">WHAT YOU GET</h4>
          <ul className="features">
            <li>✔ Unlimited access to the gym</li>
            <li>✔ 1 free group class per month</li>
            <li>✔ Access to relaxation areas</li>
          </ul>

          <button
            className="plan-btn"
            onClick={() => choosePlan({ name: "Basic", price: 25 })}
          >
            Get started →
          </button>
        </div>

        <div className="plan-card featured">
          <h3>Standard</h3>
          <p className="price">$35<span>/month</span></p>
          <p className="plan-desc">Extended package for comprehensive training.</p>

          <h4 className="features-title">WHAT YOU GET</h4>
          <ul className="features">
            <li>✔ Unlimited gym access</li>
            <li>✔ 3 group classes per month</li>
            <li>✔ Relaxation areas & sauna</li>
          </ul>

          <button
            className="plan-btn primary"
            onClick={() => choosePlan({ name: "Standard", price: 35 })}
          >
            Get started →
          </button>
        </div>

        <div className="plan-card">
          <h3>Premium</h3>
          <p className="price">$45<span>/month</span></p>
          <p className="plan-desc">Deluxe package with maximum benefits.</p>

          <h4 className="features-title">WHAT YOU GET</h4>
          <ul className="features">
            <li>✔ Unlimited gym & group classes</li>
            <li>✔ 2 PT sessions per month</li>
            <li>✔ Sauna, pool & recovery lounge</li>
          </ul>

          <button
            className="plan-btn"
            onClick={() => choosePlan({ name: "Premium", price: 45 })}
          >
            Get started →
          </button>
        </div>
      </div>
    </div>
  );
}
