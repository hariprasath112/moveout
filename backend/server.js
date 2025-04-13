const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5432;

// Allow cross-origin requests (from React on localhost:3000 or 5173, etc.)
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

// GET user data by passkey
app.get('/api/users/:passkey', async (req, res) => {
  try {
    const { passkey } = req.params;
    const result = await pool.query(
      'SELECT * FROM users WHERE passkey = $1',
      [passkey]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invalid passkey' });
    }

    // Return the first matching row
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
