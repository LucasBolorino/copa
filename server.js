import express from 'express';
import pg from 'pg';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Pool } = pg;
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const PASSWORD = process.env.PASSWORD || 'bolin990';
const SESSION_TOKEN = crypto.randomUUID();
const COOKIE = 'copa_auth';

app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'dist')));

await pool.query(`
  CREATE TABLE IF NOT EXISTS collection (
    sticker_id VARCHAR PRIMARY KEY,
    quantity   INTEGER NOT NULL
  )
`);

function parseCookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || '').split(';').map(c => c.trim().split('='))
  );
}

function requireAuth(req, res, next) {
  if (parseCookies(req)[COOKIE] === SESSION_TOKEN) return next();
  res.status(401).json({ error: 'unauthorized' });
}

app.post('/api/login', (req, res) => {
  if (req.body.password === PASSWORD) {
    res.setHeader('Set-Cookie', `${COOKIE}=${SESSION_TOKEN}; Path=/; HttpOnly; SameSite=Strict`);
    res.json({ ok: true });
  } else {
    res.status(401).json({ error: 'wrong password' });
  }
});

app.get('/api/auth/check', requireAuth, (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/collection', requireAuth, async (_req, res) => {
  const { rows } = await pool.query('SELECT sticker_id, quantity FROM collection');
  const result = {};
  for (const row of rows) result[row.sticker_id] = { quantity: row.quantity };
  res.json(result);
});

app.post('/api/collection/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (quantity <= 0) {
    await pool.query('DELETE FROM collection WHERE sticker_id = $1', [id]);
  } else {
    await pool.query(
      `INSERT INTO collection (sticker_id, quantity) VALUES ($1, $2)
       ON CONFLICT (sticker_id) DO UPDATE SET quantity = $2`,
      [id, quantity]
    );
  }
  res.json({ ok: true });
});

app.delete('/api/collection', requireAuth, async (_req, res) => {
  await pool.query('DELETE FROM collection');
  res.json({ ok: true });
});

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server on :${port}`));
