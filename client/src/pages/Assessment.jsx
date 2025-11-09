import { useState } from 'react';
import '../App.css';

export default function MyForm() {
  const [name, setVnumber] = useState("");

  const submitVNUM = (e) => {
    e.preventDefault();
    alert("Your V Number: " + name);
  };

  return (
    <div>
      <h2>Sample Form</h2>
      <form onSubmit={submitVNUM}>
        <label>
          Enter Your V Number:&nbsp;
          <input
            type="text"
            className="titleEntry"
            value={name}
            onChange={(e) => setVnumber(e.target.value)}
          />
        </label>
        <input type="submit" className="submitBtn" />
      </form>
    </div>
  );
}
