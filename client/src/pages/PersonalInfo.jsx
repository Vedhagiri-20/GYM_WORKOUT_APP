// src/pages/PersonalInfo.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PersonalInfo.css";

export default function PersonalInfo() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [plan, setPlan] = useState(() => {
    // prefer router state, fallback to localStorage
    return state?.plan || JSON.parse(localStorage.getItem("selectedPlan") || "null");
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    if (!plan) {
      // no plan? bounce user back to plans
      navigate("/plans", { replace: true });
    }
  }, [plan, navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // very light validation for UI sprint
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      alert("Please fill in First name, Last name, Email, and Phone.");
      return;
    }

    const profile = { ...form, plan };
    localStorage.setItem("userProfile", JSON.stringify(profile));

    // go to Assessment next
    navigate("/assessment", { state: { profile } });
  };

  if (!plan) return null;

  return (
    <div className="signup-page">
      <h2 className="signup-title">Personal Information</h2>
      <p className="signup-sub">We want to know more about you. Let's start with the basics.</p>

      <div className="signup-grid">
        {/* LEFT: FORM */}
        <form className="signup-form" onSubmit={onSubmit}>
          <div className="grid2">
            <div>
              <label>First Name</label>
              <input name="firstName" value={form.firstName} onChange={onChange} required />
            </div>
            <div>
              <label>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={onChange} required />
            </div>
          </div>

          <div className="grid2">
            <div>
              <label>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={onChange} required />
            </div>
            <div>
              <label>Phone Number</label>
              <input name="phone" value={form.phone} onChange={onChange} required />
            </div>
          </div>

          <div className="grid2">
            <div>
              <label>Date of Birth</label>
              <input type="date" name="dob" value={form.dob} onChange={onChange} />
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={onChange}>
                <option value="">Prefer not to say</option>
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
              </select>
            </div>
          </div>

          <div>
            <label>Address</label>
            <input name="address" value={form.address} onChange={onChange} />
          </div>

          <button type="submit" className="submitBtnWide">Create Account</button>
        </form>

        {/* RIGHT: SUMMARY */}
        <aside className="signup-summary">
          <div className="summary-card">
            <h4>Membership Summary</h4>
            <div className="summary-row">
              <span className="muted">Plan</span>
              <strong>{plan?.name}</strong>
            </div>
            <div className="summary-row">
              <span className="muted">Monthly</span>
              <strong>${plan?.price?.toFixed(2)}</strong>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <strong>${plan?.price?.toFixed(2)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
