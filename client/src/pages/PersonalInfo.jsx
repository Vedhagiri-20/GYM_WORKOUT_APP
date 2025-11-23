// src/pages/PersonalInfo.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PersonalInfo.css";

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
    address: "",
    city: "",
    zip: "",
    country: "United States",
    dob: "",
    gender: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  // If no plan, send user back to plans page
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

    // Light validation: personal + card fields
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
      ...form,
      plan,
      role: "client",
      profileCompleted: true,
      createdAt: new Date().toISOString(),
    };

    // Save profile
    localStorage.setItem("userProfile", JSON.stringify(profile));

    // Save active session
    localStorage.setItem(
      "activeUser",
      JSON.stringify({ email: profile.email, role: "client" })
    );

    // Go to client dashboard
    navigate("/client-dashboard");
  };

  if (!plan) return null;

  return (
    <div className="signup-page">
      <h2 className="signup-title">Personal Information</h2>
      <p className="signup-sub">
        We want to know more about you. Let&apos;s start with the basics.
      </p>

      <div className="signup-grid">
        {/* LEFT: FORM */}
        <form className="signup-form" onSubmit={onSubmit}>
          {/* Row 1: First / Middle / Last */}
          <div className="field-row field-row-3">
            <div className="field">
              <label htmlFor="firstName">
                First name <span className="required">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="middleInitial">Middle initial</label>
              <input
                id="middleInitial"
                name="middleInitial"
                value={form.middleInitial}
                onChange={handleChange}
                maxLength={1}
              />
            </div>

            <div className="field">
              <label htmlFor="lastName">
                Last name <span className="required">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2: Email / Phone */}
          <div className="field-row field-row-2">
            <div className="field">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="phone">
                Mobile phone <span className="required">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 3: Address / Country */}
          <div className="field-row field-row-2">
            <div className="field">
              <label htmlFor="address">
                Mailing address <span className="required">*</span>
              </label>
              <input
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
              </select>
            </div>
          </div>

          {/* Row 4: City / Zip */}
          <div className="field-row field-row-2">
            <div className="field">
              <label htmlFor="city">
                City <span className="required">*</span>
              </label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="zip">
                Zip code <span className="required">*</span>
              </label>
              <input
                id="zip"
                name="zip"
                value={form.zip}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 5: DOB / Gender */}
          <div className="field-row field-row-2">
            <div className="field">
              <label htmlFor="dob">
                Date of Birth - MM/DD/YYYY{" "}
                <span className="required">*</span>
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="gender">
                Gender <span className="required">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* CARD INFORMATION */}
          <h3 className="section-title">Card Information</h3>

          <div className="field-row field-row-2">
            <div className="field">
              <label htmlFor="cardName">
                Name on Card <span className="required">*</span>
              </label>
              <input
                id="cardName"
                name="cardName"
                value={form.cardName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="cardNumber">
                Card Number <span className="required">*</span>
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={19}
                required
              />
            </div>
          </div>

          <div className="field-row field-row-2">
            <div className="field">
              <label htmlFor="cardExpiry">
                Expiration Date (MM/YY) <span className="required">*</span>
              </label>
              <input
                id="cardExpiry"
                name="cardExpiry"
                value={form.cardExpiry}
                onChange={handleChange}
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="cardCvv">
                CVV <span className="required">*</span>
              </label>
              <input
                id="cardCvv"
                name="cardCvv"
                value={form.cardCvv}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={4}
                required
              />
            </div>
          </div>

          <button type="submit" className="submitBtnWide">
            Create Account
          </button>
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
