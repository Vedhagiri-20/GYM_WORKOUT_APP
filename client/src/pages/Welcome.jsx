import { Link } from "react-router";

export default function Welcome() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Welcome to Healthy Habits Gym</h2>
      <p>Start your fitness journey today!</p>

      <Link to="/home">
        <button
          style={{
            padding: "10px 20px",
            marginTop: "15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Enter Site
        </button>
      </Link>
    </div>
  );
}
