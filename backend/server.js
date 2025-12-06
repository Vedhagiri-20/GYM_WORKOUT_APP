// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEMP in-memory array for class demo
const users = [];

// POST /api/users -> Save new user profile
app.post("/api/users", (req, res) => {
  const user = req.body;

  // Validate required fields
  if (!user.firstName || !user.lastName || !user.email || !user.plan) {
    return res.status(400).json({
      ok: false,
      error: "Missing required fields",
    });
  }

  // Add ID + createdAt
  user.id = Date.now().toString();
  user.createdAt = new Date().toISOString();

  // WARNING: never store actual card numbers in real apps.
  if (user.cardNumber) {
    user.cardLast4 = user.cardNumber.slice(-4);
    delete user.cardNumber;
    delete user.cardCvv;
  }

  users.push(user);

  return res.status(201).json({
    ok: true,
    message: "User saved successfully",
    user,
  });
});

// GET /api/users -> Return all saved users
app.get("/api/users", (req, res) => {
  return res.json({ ok: true, users });
});

// Start the backend server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
