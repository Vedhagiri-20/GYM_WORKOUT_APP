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

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.zip ||
      !form.cardName ||
      !form.cardNumber ||
      !form.cardExpiry ||
      !form.cardCvv
    ) {
      alert("Please fill in all required fields, including card information.");
      return;
    }

    const profile = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      plan: selectedPlan ? selectedPlan.name : "Not Selected",
      role: "client",
    };

    localStorage.setItem("userProfile", JSON.stringify(profile));
    localStorage.setItem(
      "activeUser",
      JSON.stringify({ email: profile.email, role: "client" })
    );

    navigate("/client/dashboard");
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

      {selectedPlan && (
        <p className="plan-info">
          Selected Plan: <strong>{selectedPlan.name}</strong> (${selectedPlan.price}/month)
        </p>
      )}

      <form className="signup-card" onSubmit={handleCreate}>
        
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
