import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalInfo.css"; // reuse same styles

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const client = {
      email: email,
      password: password,
      role: "client",
      profileCompleted: false,
    };

    localStorage.setItem("client", JSON.stringify(client));
    navigate("/personal-info");
  }

  return (
    <div className="signup-page">
      <h1 className="signup-title">Create Your Account</h1>
      <p className="signup-sub">
        Sign up to start your assessment and become a gym member.
      </p>

      <div className="signup-grid">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-btn">
            Continue
          </button>
        </form>

        <div className="grid-2">
          <h2>Why create an account?</h2>
          <ul>
            <li>Save your assessment results</li>
            <li>Access your workout plans</li>
            <li>Manage your membership details</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Signup;
