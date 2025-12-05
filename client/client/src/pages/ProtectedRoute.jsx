// src/App.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";

/*
TL;DR
- Auth context with localStorage persistence
- ProtectedRoute wrapper that redirects to /login if not authenticated
- Role-specific, colorful gym-themed dashboards (client/trainer/admin)
- Modern art accents: SVG blobs, gradients, cards, subtle animations
- Put this file at src/App.jsx in a React + Parcel + Tailwind project
*/

// --- Auth context ---------------------------------------------------------
const AuthContext = createContext(null);
function useAuth() { return useContext(AuthContext); }
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("session");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user);
      }
    } catch (e) {
      console.error("Failed to load session", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userObj) => {
    setUser(userObj);
    localStorage.setItem("session", JSON.stringify({ user: userObj }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("session");
    // force navigation handled by consumers
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// --- ProtectedRoute ------------------------------------------------------
function ProtectedRoute({ allowedRoles = [], children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8">Loading session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) return <AccessDenied />;
  return children;
}

// --- Modern UI helpers (SVG blobs & layout) -------------------------------
function ArtBlob({ className = "", style = {} }) {
  return (
    <svg className={`absolute -z-10 ${className}`} viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" style={style}>
      <g transform="translate(300,300)">
        <path d="M120,-150C170,-90,190,-10,175,60C160,130,110,180,40,200C-30,220,-110,210,-150,160C-190,110,-190,20,-160,-40C-130,-100,-70,-140,-10,-160C50,-180,110,-210,120,-150Z" fill="url(#g)" opacity="0.95"/>
        <defs>
          <linearGradient id="g" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#FF7A88" />
            <stop offset="50%" stopColor="#FFB86B" />
            <stop offset="100%" stopColor="#7EE8FA" />
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}

// --- Pages & Components --------------------------------------------------
function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("client");

  useEffect(() => {
    if (user) navigate(redirectForRole(user.role), { replace: true });
  }, [user, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    const userObj = { id: Date.now(), name: name || `${role.charAt(0).toUpperCase()}${role.slice(1)}`, role };
    login(userObj);
    navigate(redirectForRole(role), { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-black text-white p-6 relative overflow-hidden">
      <ArtBlob className="-left-40 -top-40 w-[60rem] h-[60rem] opacity-60" />
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-semibold mb-2">Welcome to GymFlow</h1>
        <p className="mb-6 text-slate-200">Pick a role and jump into your dashboard — simple, fast, and colorful.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="p-3 rounded-lg border border-white/20 bg-white/5 text-white"
          />

          <select value={role} onChange={(e) => setRole(e.target.value)} className="p-3 rounded-lg border border-white/20 bg-white/5 text-white">
            <option value="client">Client</option>
            <option value="trainer">Trainer</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-pink-500 to-yellow-400 text-black">Sign in</button>
            <button type="button" onClick={() => { setName(''); setRole('client'); }} className="px-4 py-3 rounded-lg border border-white/20">Reset</button>
          </div>
        </form>

        <footer className="mt-6 text-sm text-white/70">Demo session stored in localStorage — persists after refresh.</footer>
      </div>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900 text-white p-6 relative">
      <ArtBlob className="-right-40 -bottom-40 w-[50rem] h-[50rem] opacity-50" />
      <div className="max-w-lg w-full bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Access Denied</h2>
        <p className="mb-4">You don’t have permission to view this page.</p>
        <a href="/" className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-400 to-teal-300 text-black">Go home</a>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold">404</h2>
        <p className="mt-2">Page not found.</p>
      </div>
    </div>
  );
}

function DashboardShell({ children }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50">
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white/60 backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-yellow-300 flex items-center justify-center text-black font-bold">GF</div>
          <div>
            <div className="font-semibold">{user?.name}</div>
            <div className="text-sm text-slate-600">{user?.role}</div>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <a href="/" className="text-slate-700">Home</a>
          <button onClick={logout} className="px-3 py-1 rounded-md border">Logout</button>
        </nav>
      </header>

      <main className="p-6">{children}</main>

      <footer className="p-4 text-center text-sm text-slate-500">GymFlow — play around with roles to test protected routes.</footer>
    </div>
  );
}

// --- Reusable UI blocks --------------------------------------------------
function StatCard({ title, value, hint }) {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 border rounded-2xl p-5 shadow-md">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      {hint && <div className="text-xs text-slate-400 mt-2">{hint}</div>}
    </div>
  );
}

function WorkoutCard({ workout }) {
  return (
    <div className="p-4 rounded-xl bg-white/80 border shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{workout.name}</div>
          <div className="text-sm text-slate-600">{workout.duration} • {workout.level}</div>
        </div>
        <div className="text-sm font-semibold text-indigo-600">{workout.badge}</div>
      </div>
      <p className="mt-3 text-sm text-slate-700">{workout.desc}</p>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1 rounded-md bg-indigo-500 text-white">Start</button>
        <button className="px-3 py-1 rounded-md border">Save</button>
      </div>
    </div>
  );
}

// --- Sample data ---------------------------------------------------------
const sampleWorkouts = [
  { id: 1, name: "Full Body Blast", duration: "30 min", level: "Intermediate", badge: "🔥", desc: "Circuit-style strength + cardio to get your heart up." },
  { id: 2, name: "Core Crusher", duration: "20 min", level: "Beginner", badge: "💪", desc: "Focused core work for posture and stability." },
  { id: 3, name: "HIIT Inferno", duration: "25 min", level: "Advanced", badge: "⚡", desc: "Short explosive intervals — bring the intensity." },
];

// --- Dashboards ----------------------------------------------------------
function ClientDashboard() {
  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <DashboardShell>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Your Workouts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sampleWorkouts.map(w => <WorkoutCard key={w.id} workout={w} />)}
            </div>
          </div>

          <aside>
            <h3 className="text-lg font-semibold mb-3">Today</h3>
            <div className="space-y-3">
              <StatCard title="Calories" value="420 kcal" hint="estimated" />
              <StatCard title="Time" value="35 min" hint="planned session" />
            </div>
          </aside>
        </div>
      </DashboardShell>
    </ProtectedRoute>
  );
}

function TrainerDashboard() {
  return (
    <ProtectedRoute allowedRoles={["trainer"]}>
      <DashboardShell>
        <h2 className="text-2xl font-bold mb-4">Trainer Console</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white/90 p-4 rounded-xl border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Active Clients</div>
                  <div className="text-sm text-slate-600">12 clients</div>
                </div>
                <button className="px-3 py-1 rounded-md bg-emerald-400 text-black">Manage</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sampleWorkouts.map(w => <WorkoutCard key={w.id} workout={w} />)}
            </div>
          </div>

          <aside className="space-y-4">
            <StatCard title="Avg Rating" value="4.8/5" />
            <StatCard title="Sessions / wk" value="34" />
          </aside>
        </div>
      </DashboardShell>
    </ProtectedRoute>
  );
}

function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <DashboardShell>
        <h2 className="text-2xl font-bold mb-4">Admin Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Users" value="1,240" hint="active this month" />
          <StatCard title="Revenue" value="$18,400" hint="monthly" />
          <StatCard title="Workouts" value="86" />
        </div>

        <section className="mt-6 bg-white/90 p-4 rounded-xl border">
          <h3 className="font-semibold mb-3">Recent Activity</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>New trainer approved — Alex P.</li>
            <li>Payment processed — 3 orders</li>
            <li>System backup completed</li>
          </ul>
        </section>
      </DashboardShell>
    </ProtectedRoute>
  );
}

function Home() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-800 to-purple-900 text-white p-6 relative overflow-hidden">
        <ArtBlob className="-left-40 -top-40 w-[60rem] h-[60rem] opacity-50" />
        <div className="max-w-4xl w-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur">
          <h1 className="text-4xl font-extrabold mb-2">GymFlow</h1>
          <p className="mb-6 text-slate-200">A colorful playground for clients, trainers, and admins. Sign in to continue.</p>
          <div className="flex gap-3">
            <a href="/login" className="px-4 py-3 rounded-md bg-gradient-to-r from-pink-500 to-yellow-400 text-black">Sign in</a>
            <a href="/login" className="px-4 py-3 rounded-md border">Try demo</a>
          </div>
        </div>
      </div>
    );
  }
  return <Navigate to={redirectForRole(user.role)} replace />;
}

// --- Helpers -------------------------------------------------------------
function redirectForRole(role) {
  switch (role) {
    case "client": return "/client";
    case "trainer": return "/trainer";
    case "admin": return "/admin";
    default: return "/";
  }
}

// --- App -----------------------------------------------------------------
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/trainer" element={<TrainerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
