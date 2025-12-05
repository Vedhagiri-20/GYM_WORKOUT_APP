// client/src/pages/BackendServer.jsx
import { useEffect, useState } from "react";
import "./BackendServer.css";

export default function BackendServer() {
  const [health, setHealth] = useState({
    reachable: false,
    message: "",
    serverTime: "",
  });

  const [meta, setMeta] = useState({
    loading: false,
    error: "",
    lastChecked: "",
  });

  // Hard-coded backend URL so there's no env / process error
  const API_BASE_URL = "http://localhost:5000";

  const checkBackend = async (e) => {
    if (e) e.preventDefault();

    setMeta((prev) => ({
      ...prev,
      loading: true,
      error: "",
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/api/health`);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} — ${res.statusText}`);
      }

      const data = await res.json();

      const payload = {
        reachable: true,
        message: data.message || "Backend responded successfully.",
        serverTime: data.timestamp || new Date().toISOString(),
      };

      setHealth(payload);

      const now = new Date().toISOString();
      setMeta({
        loading: false,
        error: "",
        lastChecked: now,
      });
    } catch (err) {
      console.error("Backend health check failed:", err);

      setHealth({
        reachable: false,
        message: "",
        serverTime: "",
      });

      setMeta({
        loading: false,
        error: err.message || "Failed to reach backend.",
        lastChecked: new Date().toISOString(),
      });
    }
  };

  useEffect(() => {
    checkBackend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="backend-page">
      <h2>PBI 9 – Backend Server Initialization</h2>
      <p className="subtitle">
        As a system user (client, trainer, or admin), I want a working backend
        so the interface can fetch data and show meaningful responses.
      </p>

      {/* WHO / WHAT / HOW */}
      <div className="summary-grid">
        <section className="card">
          <h3>Who</h3>
          <ul>
            <li>Client</li>
            <li>Trainer</li>
            <li>Admin</li>
          </ul>
        </section>

        <section className="card">
          <h3>What</h3>
          <p>
            Start backend service and expose a basic API endpoint that the
            frontend can call.
          </p>
        </section>

        <section className="card">
          <h3>How</h3>
          <ul>
            <li>Set up backend folder structure</li>
            <li>Initialize a Node.js project</li>
            <li>Install dependencies (Express, CORS, etc.)</li>
            <li>Configure server entry file</li>
            <li>Create a basic API route to confirm server is reachable</li>
          </ul>
        </section>
      </div>

      {/* LIVE BACKEND STATUS */}
      <section className="card status-card">
        <h3>Backend Status</h3>
        <p>
          <strong>Base URL:</strong> {API_BASE_URL}
        </p>
        <p>
          <strong>Health Endpoint:</strong> /api/health
        </p>
        <p>
          <strong>Last Checked:</strong>{" "}
          {meta.lastChecked
            ? new Date(meta.lastChecked).toLocaleString()
            : "—"}
        </p>

        <div className="status-box">
          {meta.loading && <p>Checking backend status…</p>}

          {!meta.loading && meta.error && (
            <>
              <p className="error-text">Backend not reachable ❌</p>
              <p className="error-detail">{meta.error}</p>
            </>
          )}

          {!meta.loading && !meta.error && health.reachable && (
            <>
              <p className="ok-text">Backend is running and reachable ✅</p>
              <p>
                <strong>Message:</strong> {health.message}
              </p>
              <p>
                <strong>Server Time:</strong>{" "}
                {new Date(health.serverTime).toLocaleString()}
              </p>
            </>
          )}

          {!meta.loading && !meta.error && !health.reachable && (
            <p>No successful response received yet.</p>
          )}
        </div>

        <button
          onClick={checkBackend}
          className="submitBtnWide"
          disabled={meta.loading}
        >
          {meta.loading ? "Checking…" : "Re-check Backend"}
        </button>
      </section>

      {/* DEFINITION OF DONE */}
      <section className="card">
        <h3>Definition of Done</h3>
        <ul className="dod-list">
          <li>Backend server runs without errors.</li>
          <li>
            Visiting the test endpoint returns a JSON response (checked above).
          </li>
          <li>Project structure is clean and organized.</li>
          <li>
            Test endpoint is wired to the frontend and visible on this page.
          </li>
          <li>
            Code is ready to be pushed, reviewed, and merged into the main
            branch.
          </li>
        </ul>
      </section>
    </div>
  );
}


