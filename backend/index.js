// index.js
const express    = require('express');
const cors       = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./auth');
const pool       = require('./db');
const jwt        = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// 1) SECURITY / PARSING
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());             // <— make sure this is *before* requireAuth

// 2) AUTH ROUTES
app.use(authRouter);                 // mounts POST /login and POST /logout

// 3) PROTECTION MIDDLEWARE
function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.passkey = payload.passkey;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// 4) YOUR PROTECTED ENDPOINTS
app.get('/users', requireAuth,async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/script', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM script');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/data', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('SELECT c.name, array_agg(s.name ORDER BY s.position) AS subs FROM categories c LEFT JOIN subcategories s ON s.category_id = c.id GROUP BY c.id, c.name;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'lax' })
     .json({ success: true });
});

// 5) START SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Server listening on 0.0.0.0:${PORT}`)
);