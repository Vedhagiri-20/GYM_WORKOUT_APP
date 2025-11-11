// src/pages/ClientAssessment.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientAssessment.css";

export default function ClientAssessment() {
  const navigate = useNavigate();

  // pull signed-up user (saved in PersonalInfo.jsx)
  const profile = useMemo(
    () => JSON.parse(localStorage.getItem("userProfile") || "null"),
    []
  );

  // assessment form
  const [form, setForm] = useState({
    fitnessLevel: "",
    experience: "",
    goals: "",
    injuries: "",
  });

  // generated workouts (UI-only, mock)
  const [workouts, setWorkouts] = useState([]);

  if (!profile) {
    return (
      <div className="assessment-page">
        <h2>No profile found</h2>
        <p>Please complete your signup first.</p>
        <button onClick={() => navigate("/signup")} className="submitBtnWide">
          Go to Signup
        </button>
      </div>
    );
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const generateWorkouts = (e) => {
    e.preventDefault();

    if (!form.fitnessLevel) {
      alert("Please select a fitness level first.");
      return;
    }

    let generated = [];
    if (form.fitnessLevel === "beginner") {
      generated = [
        {
          name: "Full Body Starter",
          desc: "Focus on fundamentals and movement quality.",
          exercises: ["Bodyweight Squat — 3×12", "Knee Push-Ups — 3×10", "DB Row — 3×12"],
        },
        {
          name: "Core & Mobility",
          desc: "Strengthen core and improve flexibility.",
          exercises: ["Plank — 3×30s", "Glute Bridge — 3×12", "Dead Bug — 3×10/side"],
        },
        {
          name: "Cardio Light",
          desc: "Low impact endurance practice.",
          exercises: ["Treadmill — 20 min", "Bike — 10 min", "Jump Rope — 3×1 min"],
        },
      ];
    } else if (form.fitnessLevel === "intermediate") {
      generated = [
        {
          name: "Upper Day",
          desc: "Balanced upper strength session.",
          exercises: ["Bench Press — 4×8", "Lat Pulldown — 4×10", "DB Shoulder Press — 3×10"],
        },
        {
          name: "Lower Day",
          desc: "Lower body strength and stability.",
          exercises: ["Back Squat — 4×6", "Romanian DL — 3×8", "Walking Lunge — 3×12"],
        },
        {
          name: "Cardio + Core",
          desc: "Conditioning and core stability.",
          exercises: ["Row — 12 min", "Mountain Climbers — 3×40s", "Side Plank — 3×30s/side"],
        },
      ];
    } else {
      generated = [
        {
          name: "Strength Focus",
          desc: "Heavy compound lifts for power.",
          exercises: ["Deadlift — 5×3", "Overhead Press — 5×5", "Weighted Pull-Up — 4×5"],
        },
        {
          name: "Hypertrophy Push/Pull",
          desc: "Volume for growth.",
          exercises: ["Incline DB Press — 4×10", "Cable Row — 4×12", "EZ-Bar Curl — 3×12"],
        },
        {
          name: "HIIT Session",
          desc: "High-intensity circuit.",
          exercises: ["Burpees — 6×20s", "Air Bike — 6×20s", "KB Swings — 6×15"],
        },
      ];
    }

    setWorkouts(generated);
  };

  const removeWorkout = (index) => {
    setWorkouts((prev) => prev.filter((_, i) => i !== index));
  };

  const approveWorkouts = () => {
    const payload = {
      profileName: `${profile.firstName || ""} ${profile.lastName || ""}`.trim(),
      assessment: form,
      workouts,
      assignedAt: new Date().toISOString(),
    };
    localStorage.setItem("assignedWorkouts", JSON.stringify(payload));
    alert(" Workouts assigned to client profile (saved to localStorage).");
  };

  return (
    <div className="assessment-page">
      <h2>Welcome, {profile.firstName?.toUpperCase()}!</h2>

      {/* PROFILE SUMMARY (two cards like Crunch) */}
      <div className="profile-grid">
        <section className="card">
          <h3>Member Info</h3>
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Address:</strong> {profile.address || "—"}</p>
          <p><strong>Phone:</strong> {profile.phone || "—"}</p>
          <p><strong>Email:</strong> {profile.email || "—"}</p>
          <p><strong>Birthday:</strong> {profile.dob || "—"}</p>
        </section>

        <section className="card">
          <h3>Account Info</h3>
          <p><strong>Status:</strong> Active</p>
          <p><strong>Membership Plan:</strong> {profile.plan?.name}</p>
          <p><strong>Payment Type:</strong> Monthly</p>
          <p><strong>Start Date:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Home Club:</strong> —</p>
        </section>
      </div>

      {/* ASSESSMENT FORM */}
      <form className="assessment-form" onSubmit={generateWorkouts}>
        <h3>Client Assessment</h3>

        <label>Fitness Level</label>
        <select name="fitnessLevel" value={form.fitnessLevel} onChange={onChange} required>
          <option value="">Select</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <label>Experience (years)</label>
        <input
          type="number"
          name="experience"
          value={form.experience}
          onChange={onChange}
          placeholder="e.g. 2"
          min="0"
        />

        <label>Goals</label>
        <input
          name="goals"
          value={form.goals}
          onChange={onChange}
          placeholder="e.g. Lose weight, Build muscle"
        />

        <label>Injuries / Health Concerns</label>
        <textarea
          name="injuries"
          value={form.injuries}
          onChange={onChange}
          rows={3}
          placeholder="Describe any injuries or limitations"
        />

        <button type="submit" className="submitBtnWide">Generate Workouts</button>
      </form>

      {/* GENERATED WORKOUTS */}
      {workouts.length > 0 && (
        <section className="workouts-section">
          <h3>Generated Workouts</h3>
          <div className="workout-cards">
            {workouts.map((w, i) => (
              <div className="workout-card" key={i}>
                <h4>{w.name}</h4>
                <p className="desc">{w.desc}</p>
                <ul>
                  {w.exercises.map((ex, j) => (
                    <li key={j}>🏋️ {ex}</li>
                  ))}
                </ul>
                <div className="actions">
                  <button onClick={() => alert("Edit coming soon")}>✏️ Edit</button>
                  <button onClick={() => removeWorkout(i)}>🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={approveWorkouts} className="submitBtnWide">
            ✅ Approve & Assign Workouts
          </button>
        </section>
      )}
    </div>
  );
}
