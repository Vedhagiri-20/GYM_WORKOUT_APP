// src/pages/PersonalInfo.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalInfo.css";

export default function PersonalInfo() {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  });

  // Load selected plan from localStorage
  useEffect(() => {
    const planJson = localStorage.getItem("selectedPlan");
    if (planJson) {
      setSelectedPlan(JSON.parse(planJson));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();

    // Validate simple fields
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.password
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Build user profile object
    const profile = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      plan: selectedPlan ? selectedPlan.name : "Not Selected",
      role: "client"
    };

    // Save client profile
    localStorage.setItem("userProfile", JSON.stringify(profile));

    // Save active session
    localStorage.setItem(
      "activeUser",
      JSON.stringify({ email: profile.email, role: "client" })
    );

    // Redirect to client dashboard
    navigate("/client/dashboard");
  };

  return (
    <div className="signup-page">
      <h2 className="signup-title">Create Your Account</h2>

      {selectedPlan && (
        <p className="plan-info">
          Selected Plan: <strong>{selectedPlan.name}</strong>{" "}
          (${selectedPlan.price}/month)
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
