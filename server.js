import express from 'express';
import pg from 'pg';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Pool } = pg;
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const COOKIE = 'copa_auth';

// Map<token, userId>
const sessions = new Map();

app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'dist')));

// ── Helpers de senha ──────────────────────────────────────────
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err);
      else resolve(`${salt}:${key.toString('hex')}`);
    });
  });
}

function verifyPassword(password, hash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');
    crypto.scrypt(password, salt, 64, (err, derived) => {
      if (err) reject(err);
      else resolve(derived.toString('hex') === key);
    });
  });
}

// ── Migração / setup do banco ─────────────────────────────────
await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id       SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL
  )
`);

// Cria collection se não existir (estrutura nova)
await pool.query(`
  CREATE TABLE IF NOT EXISTS collection (
    sticker_id VARCHAR NOT NULL,
    quantity   INTEGER NOT NULL,
    user_id    INTEGER REFERENCES users(id),
    PRIMARY KEY (sticker_id, user_id)
  )
`);

// Garante que o usuário "bolo" existe
let boloId;
const existing = await pool.query(`SELECT id FROM users WHERE username = 'bolo'`);
if (existing.rows.length === 0) {
  const hashed = await hashPassword('bolin990');
  const { rows } = await pool.query(
    `INSERT INTO users (username, password) VALUES ('bolo', $1) RETURNING id`,
    [hashed]
  );
  boloId = rows[0].id;
} else {
  boloId = existing.rows[0].id;
}

// Migração: adiciona user_id se a tabela antiga não tiver
const colCheck = await pool.query(`
  SELECT column_name FROM information_schema.columns
  WHERE table_name = 'collection' AND column_name = 'user_id'
`);
if (colCheck.rows.length === 0) {
  await pool.query(`ALTER TABLE collection ADD COLUMN user_id INTEGER REFERENCES users(id)`);
}

// Migra dados antigos (sem user_id) para o bolo
await pool.query(`UPDATE collection SET user_id = $1 WHERE user_id IS NULL`, [boloId]);

// Recria PK como composta se ainda for só sticker_id
const pkCheck = await pool.query(`
  SELECT COUNT(*) FROM information_schema.key_column_usage
  WHERE table_name = 'collection' AND constraint_name = (
    SELECT constraint_name FROM information_schema.table_constraints
    WHERE table_name = 'collection' AND constraint_type = 'PRIMARY KEY'
  ) AND column_name = 'user_id'
`);
if (pkCheck.rows[0].count === '0') {
  await pool.query(`ALTER TABLE collection DROP CONSTRAINT IF EXISTS collection_pkey`);
  await pool.query(`ALTER TABLE collection ADD PRIMARY KEY (sticker_id, user_id)`);
}

// ── Auth helpers ──────────────────────────────────────────────
function parseCookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || '').split(';').map(c => c.trim().split('='))
  );
}

function requireAuth(req, res, next) {
  const token = parseCookies(req)[COOKIE];
  const userId = sessions.get(token);
  if (!userId) return res.status(401).json({ error: 'unauthorized' });
  req.userId = userId;
  next();
}

// ── Rotas ─────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'missing fields' });

  const { rows } = await pool.query(`SELECT id, password FROM users WHERE username = $1`, [username]);
  if (rows.length === 0) return res.status(401).json({ error: 'invalid' });

  const ok = await verifyPassword(password, rows[0].password);
  if (!ok) return res.status(401).json({ error: 'invalid' });

  const token = crypto.randomUUID();
  sessions.set(token, rows[0].id);
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict`);
  res.json({ ok: true });
});

app.post('/api/logout', (req, res) => {
  const token = parseCookies(req)[COOKIE];
  sessions.delete(token);
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
  res.json({ ok: true });
});

app.get('/api/users/stats', requireAuth, async (_req, res) => {
  const { rows } = await pool.query(`
    SELECT u.username, COUNT(c.sticker_id)::int AS obtained
    FROM users u
    LEFT JOIN collection c ON c.user_id = u.id
    GROUP BY u.id, u.username
    ORDER BY obtained DESC
  `);
  res.json(rows.map(r => ({
    username: r.username,
    obtained: r.obtained,
    pct: Math.round(r.obtained / 994 * 100),
  })));
});

app.get('/api/auth/check', requireAuth, (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/collection', requireAuth, async (req, res) => {
  const { rows } = await pool.query(
    'SELECT sticker_id, quantity FROM collection WHERE user_id = $1',
    [req.userId]
  );
  const result = {};
  for (const row of rows) result[row.sticker_id] = { quantity: row.quantity };
  res.json(result);
});

app.post('/api/collection/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (quantity <= 0) {
    await pool.query(
      'DELETE FROM collection WHERE sticker_id = $1 AND user_id = $2',
      [id, req.userId]
    );
  } else {
    await pool.query(
      `INSERT INTO collection (sticker_id, quantity, user_id) VALUES ($1, $2, $3)
       ON CONFLICT (sticker_id, user_id) DO UPDATE SET quantity = $2`,
      [id, quantity, req.userId]
    );
  }
  res.json({ ok: true });
});

app.delete('/api/collection', requireAuth, async (req, res) => {
  await pool.query('DELETE FROM collection WHERE user_id = $1', [req.userId]);
  res.json({ ok: true });
});


app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server on :${port}`));
