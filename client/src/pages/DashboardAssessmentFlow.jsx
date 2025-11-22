// src/pages/DashboardAssessmentFlow.jsx
import { useMemo, useState, useEffect } from "react";
import "./ClientAssessment.css"; // reuse existing styles
import GeneratedWorkouts from "./GeneratedWorkouts";
import { generateWorkoutsFromAssessment } from "./WorkoutGenerator";

export default function DashboardAssessmentFlow() {
  // Pull signed-up user (same as ClientAssessment / PersonalInfo)
  const profile = useMemo(
    () => JSON.parse(localStorage.getItem("userProfile") || "null"),
    []
  );

  // Assessment form state
  const [form, setForm] = useState({
    fitnessLevel: "",
    experience: "",
    goals: "",
    daysPerWeek: "3",
    injuries: "",
    preferredEquipment: [],
  });

  // Did the user click "Start Assessment"?
  const [hasStarted, setHasStarted] = useState(false);

  // Workouts currently visible in the UI
  const [workouts, setWorkouts] = useState([]);

  // Persisted assigned workouts from previous sessions
  const [assigned, setAssigned] = useState(() => {
    const raw = localStorage.getItem("assignedWorkouts");
    return raw ? JSON.parse(raw) : null;
  });

  // When assigned workouts exist, keep local workouts in sync
  useEffect(() => {
    if (assigned?.workouts?.length) {
      setWorkouts(assigned.workouts);
    }
  }, [assigned]);

  if (!profile) {
    return (
      <div className="assessment-page">
        <h2>Complete your membership first</h2>
        <p className="muted">
          We couldn&apos;t find a saved profile. Please finish the membership
          signup flow before starting the assessment.
        </p>
      </div>
    );
  }

  const handleStartAssessment = () => {
    setHasStarted(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Multi-select checkboxes for equipment
    if (name === "preferredEquipment") {
      setForm((prev) => {
        const current = new Set(prev.preferredEquipment || []);
        if (checked) {
          current.add(value);
        } else {
          current.delete(value);
        }
        return { ...prev, preferredEquipment: Array.from(current) };
      });
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleGenerateWorkouts = (e) => {
    e?.preventDefault();

    if (!form.fitnessLevel) {
      alert("Please select a fitness level before generating workouts.");
      return;
    }

    const generated = generateWorkoutsFromAssessment(form);

    if (!generated.length) {
      alert("No workouts could be generated from this assessment.");
      return;
    }

    setWorkouts(generated);

    const payload = {
      profileName: `${profile.firstName || ""} ${profile.lastName || ""}`.trim(),
      assessment: form,
      workouts: generated,
      assignedAt: new Date().toISOString(),
    };

    setAssigned(payload);
    localStorage.setItem("assignedWorkouts", JSON.stringify(payload));
  };

  const handleDeleteWorkout = (index) => {
    if (!workouts.length) return;

    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);

    if (assigned) {
      const updatedAssigned = { ...assigned, workouts: updatedWorkouts };
      setAssigned(updatedAssigned);
      localStorage.setItem("assignedWorkouts", JSON.stringify(updatedAssigned));
    }
  };

  const handleApproveUIOnly = () => {
    alert("Workouts approved for today (UI-only).");
  };

  return (
    <div className="assessment-page">
      {/* Header */}
      <h2>Assessment & Workout Plan</h2>
      <p className="muted">
        Complete your assessment to auto-generate a beginner-friendly workout
        plan and see it under <strong>My Workouts</strong>.
      </p>

      {/* Profile Summary */}
      <div className="assessment-header">
        <section className="card">
          <h3>Client Profile</h3>
          <p>
            <strong>Name:</strong> {profile.firstName} {profile.lastName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email || "—"}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone || "—"}
          </p>
          <p>
            <strong>Plan:</strong> {profile.plan?.name || "—"}
          </p>
        </section>

        <section className="card">
          <h3>Next Step</h3>
          {!hasStarted ? (
            <>
              <p>
                Click the button below to start your assessment and generate{" "}
                <strong>3 auto workouts</strong> based on your fitness level.
              </p>
              <button className="submitBtnWide" onClick={handleStartAssessment}>
                Start Assessment
              </button>
            </>
          ) : (
            <p>
              You&apos;re currently filling out your assessment below. Adjust
              the fields and click <strong>Generate Workouts</strong>.
            </p>
          )}
        </section>
      </div>

      {/* ASSESSMENT FORM */}
      {hasStarted && (
        <form className="assessment-form" onSubmit={handleGenerateWorkouts}>
          <h3>Client Assessment</h3>

          <label>Fitness Level</label>
          <select
            name="fitnessLevel"
            value={form.fitnessLevel}
            onChange={handleChange}
            required
          >
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
            onChange={handleChange}
            placeholder="e.g. 0, 1, 3"
            min="0"
          />

          <label>Goals</label>
          <input
            name="goals"
            value={form.goals}
            onChange={handleChange}
            placeholder="e.g. fat loss, muscle gain, general fitness"
          />

          <label>Days per Week Available</label>
          <select
            name="daysPerWeek"
            value={form.daysPerWeek}
            onChange={handleChange}
          >
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="4">4 days</option>
            <option value="5">5+ days</option>
          </select>

          <label>Injuries or Limitations</label>
          <textarea
            name="injuries"
            value={form.injuries}
            onChange={handleChange}
            placeholder="e.g. right knee, lower back, shoulder mobility"
          />

          <fieldset className="equipment-fieldset">
            <legend>Preferred Equipment</legend>
            <div className="equipment-grid">
              <label>
                <input
                  type="checkbox"
                  name="preferredEquipment"
                  value="dumbbells"
                  checked={form.preferredEquipment.includes("dumbbells")}
                  onChange={handleChange}
                />
                Dumbbells
              </label>
              <label>
                <input
                  type="checkbox"
                  name="preferredEquipment"
                  value="barbell"
                  checked={form.preferredEquipment.includes("barbell")}
                  onChange={handleChange}
                />
                Barbell
              </label>
              <label>
                <input
                  type="checkbox"
                  name="preferredEquipment"
                  value="machines"
                  checked={form.preferredEquipment.includes("machines")}
                  onChange={handleChange}
                />
                Machines
              </label>
              <label>
                <input
                  type="checkbox"
                  name="preferredEquipment"
                  value="bodyweight"
                  checked={form.preferredEquipment.includes("bodyweight")}
                  onChange={handleChange}
                />
                Bodyweight
              </label>
            </div>
          </fieldset>

          <button type="submit" className="submitBtnWide">
            ⚙️ Generate Workouts
          </button>
        </form>
      )}

      {/* MY WORKOUTS SECTION (always visible once generated/assigned) */}
      <GeneratedWorkouts
        workouts={workouts}
        assignedAt={assigned?.assignedAt}
        onDeleteWorkout={handleDeleteWorkout}
        onApproveWorkouts={handleApproveUIOnly}
        title="My Workouts"
        showApproveButton={true}
      />
    </div>
  );
}
