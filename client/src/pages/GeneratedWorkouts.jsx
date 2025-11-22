// src/pages/GeneratedWorkouts.jsx
import "./ClientAssessment.css"; // reuse card + layout styles

export default function GeneratedWorkouts({
  workouts = [],
  assignedAt,
  title = "My Workouts",
  onDeleteWorkout,
  onApproveWorkouts,
  onEditWorkout,
  showApproveButton = true,
}) {
  if (!workouts || workouts.length === 0) {
    return (
      <section className="my-workouts">
        <div className="section-header">
          <h3>{title}</h3>
        </div>
        <p className="muted">
          No workouts have been generated yet. Complete the assessment to see
          your beginner workout plan here.
        </p>
      </section>
    );
  }

  const handleDelete = (index) => {
    if (onDeleteWorkout) {
      onDeleteWorkout(index);
    }
  };

  const handleEdit = (index) => {
    if (onEditWorkout) {
      onEditWorkout(index);
    } else {
      alert("Edit is UI-only for now. Hook this up to your editor later.");
    }
  };

  const handleApprove = () => {
    if (onApproveWorkouts) {
      onApproveWorkouts();
    } else {
      alert("Workouts approved (UI-only).");
    }
  };

  return (
    <section className="my-workouts">
      <div className="section-header">
        <h3>{title}</h3>
        {assignedAt && (
          <span className="muted">
            Assigned on {new Date(assignedAt).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="workout-cards">
        {workouts.map((workout, index) => (
          <article className="workout-card" key={index}>
            <h4>{workout.name}</h4>
            {workout.desc && <p className="desc">{workout.desc}</p>}

            {Array.isArray(workout.exercises) && workout.exercises.length > 0 && (
              <ul>
                {workout.exercises.map((exercise, i) => (
                  <li key={i}>🏋️ {exercise}</li>
                ))}
              </ul>
            )}

            <div className="actions">
              <button type="button" onClick={() => handleEdit(index)}>
                ✏️ Edit
              </button>
              <button type="button" onClick={() => handleDelete(index)}>
                🗑 Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {showApproveButton && (
        <button
          type="button"
          className="submitBtnWide approve-btn"
          onClick={handleApprove}
        >
          ✅ Approve Today&apos;s Plan
        </button>
      )}
    </section>
  );
}
