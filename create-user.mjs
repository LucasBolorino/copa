import { scrypt, randomBytes } from 'crypto';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: 'postgresql://postgres:hmWPwCEUdWiiQGgoalQqLXQAVeUmTbwP@switchyard.proxy.rlwy.net:56671/railway'
});

await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id       SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL
  )
`);

const username = process.argv[2];
const password = process.argv[3];

const salt = randomBytes(16).toString('hex');
scrypt(password, salt, 64, async (err, key) => {
  const hash = `${salt}:${key.toString('hex')}`;
  try {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hash]);
    console.log(`Usuário "${username}" criado com sucesso.`);
  } catch (e) {
    console.log('Erro:', e.message);
  }
  await pool.end();
});
