// src/App.jsx
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Welcome from './pages/Welcome';
import ClientAssessment from './pages/ClientAssessment';
import WorkoutLog from './pages/WorkoutLog';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="header">
          <h1>🏋️ Healthy Habits Gym</h1>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/assessment">Assessment</Link> |{" "}
            <Link to="/workouts">Workouts</Link>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/assessment" element={<ClientAssessment />} />
            <Route path="/workouts" element={<WorkoutLog />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2025 Healthy Habits Gym</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
