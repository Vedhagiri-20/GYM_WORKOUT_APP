import { useState } from "react";
import "../App.css";

export default function ClientAssessment() {
  const [vnumber, setVnumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your V Number: " + vnumber);
  };

  return (
    <div>
      <h2>Client Assessment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Your V Number:
          <input
            type="text"
            className="titleEntry"
            value={vnumber}
            onChange={(e) => setVnumber(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" className="submitBtn" />
      </form>
    </div>
  );
}
