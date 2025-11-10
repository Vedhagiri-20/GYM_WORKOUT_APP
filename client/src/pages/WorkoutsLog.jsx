// src/pages/WorkoutLog.jsx
import { useState } from "react";
import "../App.css";

// Displays the exercise summary
function Summary({ title, reps, sets, description }) {
  return (
    <div className="mainContent">
      <div className="infoBox">Here’s the exercise you entered:</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{`Do ${reps} reps for ${sets} sets.`}</p>
    </div>
  );
}

export default function WorkoutLog() {
  const [exerciseData, setExerciseData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    setExerciseData(data);
  };

  const handleClose = () => setExerciseData(null);

  // Form UI
  const formUI = (
    <form onSubmit={handleSubmit} className="mainContent">
      <h2>Workout Log</h2>

      <label>Exercise Name:</label>
      <input className="titleEntry" name="title" required />

      <label>Number of Reps:</label>
      <input className="numEntry" name="reps" type="number" min="1" required />

      <label>Number of Sets:</label>
      <input className="numEntry" name="sets" type="number" min="1" required />

      <label>Description:</label>
      <textarea className="textEntry" name="description" rows={5} cols={40} />

      <button type="submit" className="submitBtn">
        Save Exercise
      </button>
    </form>
  );

  // Conditional render
  return exerciseData ? (
    <>
      <Summary
        title={exerciseData.title}
        reps={exerciseData.reps}
        sets={exerciseData.sets}
        description={exerciseData.description}
      />
      <button onClick={handleClose} className="submitBtn">
        Add Another Exercise
      </button>
    </>
  ) : (
    formUI
  );
}
