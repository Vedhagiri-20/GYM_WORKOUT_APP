import { useState } from 'react';
import '../App.css';

function Summary({ title, reps, sets, desc }) {
  return (
    <>
      <div className="infoBox">A new exercise has been added to the database:</div>
      <h2>{title}</h2>
      <p>{desc}</p>
      <p>{`Do ${String(reps)} reps, for ${String(sets)} sets.`}</p>
    </>
  );
}

function NewExercise() {
  const [newExData, setNewExData] = useState(null);

  const saveNewExercise = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    setNewExData(formJson);
  };

  const formUI = (
    <form method="post" onSubmit={saveNewExercise}>
      <label>Exercise Name:</label>
      <input className="titleEntry" name="exerciseTitle" />
      <hr />

      <label>Number of Reps:</label>
      <input className="numEntry" name="numReps" />
      <hr />

      <label>Number of Sets:</label>
      <input className="numEntry" name="numSets" />
      <hr />

      <label>Helpful Description:</label>
      <textarea className="textEntry" name="exDesc" rows={10} cols={40} />
      <hr />

      <button type="submit" className="submitBtn">Save New Exercise</button>
    </form>
  );

  const closeSummary = () => setNewExData(null);

  if (newExData !== null) {
    return (
      <>
        <Summary
          title={newExData.exerciseTitle}
          reps={newExData.numReps}
          sets={newExData.numSets}
          desc={newExData.exDesc}
        />
        <button onClick={closeSummary}>Close</button>
      </>
    );
  } else {
    return <>{formUI}</>;
  }
}

export default NewExercise;
