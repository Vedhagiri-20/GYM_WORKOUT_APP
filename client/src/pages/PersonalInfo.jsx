// src/pages/PersonalInfo.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PersonalInfo.css";

/* ⭐ Import background video */
import gymVideo from "../assets/GYM_BG.mp4";

export default function PersonalInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Selected plan: prefer router state, fallback to localStorage
  const [plan] = useState(() => {
    const fromState = state?.plan;
    if (fromState) return fromState;

    const stored = localStorage.getItem("selectedPlan");
    return stored ? JSON.parse(stored) : null;
  });

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    middleInitial: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    // if user somehow got here without a plan, send them back
    if (!plan) {
      navigate("/plans", { replace: true });
    }
  }, [plan, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic required fields
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      alert("Please fill in first name, last name, email, and phone.");
      return;
    }

    const profile = {
      firstName: form.firstName,
      middleInitial: form.middleInitial,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      plan: plan ? plan.name : "Not Selected",
      role: "client",
    };

    try {
      // ✅ Call backend POST /api/users
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        console.error("Error response from backend:", errorBody);
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("Profile saved successfully:", result);

      // Keep your local storage behavior
      localStorage.setItem("userProfile", JSON.stringify(profile));
      localStorage.setItem(
        "activeUser",
        JSON.stringify({ email: profile.email, role: "client" })
      );

      navigate("/client/dashboard");
    } catch (err) {
      console.error("Error saving profile:", err.message);
      alert("Something went wrong while saving your profile.");
    }
  };

  if (!plan) return null;

  return (
    <div className="signup-page">
      {/* Background Video */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={gymVideo} type="video/mp4" />
      </video>

      {/* Dark transparent overlay */}
      <div className="overlay"></div>

      <h2 className="signup-title">Create Your Account</h2>

      {plan && (
        <p className="plan-info">
          Selected Plan: <strong>{plan.name}</strong> (${plan.price}/month)
        </p>
      )}

      <form className="signup-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Middle Initial</label>
          <input
            name="middleInitial"
            type="text"
            value={form.middleInitial}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button className="signup-btn" type="submit">
          Create Account →
        </button>
      </form>
    </div>
  );
}
