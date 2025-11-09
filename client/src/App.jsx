import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import Welcome from './pages/Welcome';
import Home from './pages/Workouts';       // this imports the default export from Workouts.jsx
import SampleForm from './pages/Assessment';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="header">
          <h1>🏋️ Healthy Habits Gym</h1>
          <nav>
            <Link to="/">Welcome</Link> |{" "}
            <Link to="/home">Home</Link> |{" "}
            <Link to="/form">Sample Form</Link>
          </nav>
        </header>

        <main className="content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/form" element={<SampleForm />} />
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
