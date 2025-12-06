// backend/users.js
const express = require("express");
const router = express.Router();

// NOTE: this assumes PBI 11 will export a `query` function from ./db
// For now, if you don't have a real DB yet, you can comment out the query
// line and the INSERT, and just log to the console.
const { query } = require("./db");

// GET /api/users  -> used by your UserList.jsx
router.get("/", async (req, res) => {
  try {
    // Adjust this SQL to match your actual table/column names when the DB is ready
    const rows = await query("SELECT id, name, email FROM users LIMIT 50");
    return res.json(rows);
  } catch (err) {
    console.error("Error in GET /api/users:", err.message);
    return res
      .status(500)
      .json({ error: "Failed to fetch users" });
  }
});

// POST /api/users  -> PBI 14: save a new user profile
router.post("/", async (req, res) => {
  const {
    firstName,
    middleInitial,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zip,
    plan,
  } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !plan) {
    return res.status(400).json({
      error: "Missing required fields (firstName, lastName, email, plan)",
    });
  }

  try {
    // When the DB is ready, adjust this SQL + columns to match your schema
    const sql = `
      INSERT INTO users (
        first_name,
        middle_initial,
        last_name,
        email,
        phone,
        address,
        city,
        state,
        zip,
        plan
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      firstName,
      middleInitial || null,
      lastName,
      email,
      phone || null,
      address || null,
      city || null,
      state || null,
      zip || null,
      plan,
    ];

    await query(sql, params);

    console.log("✅ New user profile saved:", {
      firstName,
      lastName,
      email,
      plan,
    });

    return res.status(201).json({
      message: "User profile saved successfully",
    });
  } catch (err) {
    console.error("Error in POST /api/users:", err.message);
    return res
      .status(500)
      .json({ error: "Failed to save user profile" });
  }
});

module.exports = router;
