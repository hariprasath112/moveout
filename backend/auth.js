// auth.js
const express       = require('express');
const jwt           = require('jsonwebtoken');
const cookieParser  = require('cookie-parser');
const pool          = require('./db');
require('dotenv').config();

const router = express.Router();
router.use(cookieParser());

// POST /login
router.post('/login', async (req, res) => {
  const { passkey } = req.body;
  const { rows } = await pool.query(
    'SELECT id FROM users WHERE id = $1',
    [passkey]
  );
  if (!rows.length) return res.status(401).json({ error: 'Invalid passkey' });

  const token = jwt.sign(
    { passkey },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 4
    })
    .json({ success: true });
});

// POST /logout
router.post('/logout', (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax'
    })
    .json({ success: true });
});

module.exports = router;
