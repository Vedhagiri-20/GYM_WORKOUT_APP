// backend/routes/users.js
const express = require('express');
const router = express.Router();

// Expect PBI 11 to export a `query` function from ../db
const { query } = require('../db');

// GET /api/users -> return user data as JSON
router.get('/', async (req, res) => {
  try {
    // Adjust table/columns to match your actual schema
    const rows = await query(
      'SELECT id, name, email FROM users LIMIT 50'
    );

    // Success: send JSON
    res.json(rows);
  } catch (err) {
    console.error('Error in GET /api/users:', err.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
