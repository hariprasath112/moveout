const express = require('express');
const pool    = require('./db');   

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/script', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM script');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT c.name, array_agg(s.name ORDER BY s.position) AS subs FROM categories c LEFT JOIN subcategories s ON s.category_id = c.id GROUP BY c.id, c.name;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server listening on 0.0.0.0:${PORT}`)
);
