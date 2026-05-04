import { useState } from 'react';

interface Props {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        onLogin();
      } else {
        setError(true);
        setPassword('');
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-icon">⚽</div>
        <h1 className="login-title">Copa 2026</h1>
        <p className="login-sub">Digite seus dados para acessar</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            className={`login-input ${error ? 'login-input-error' : ''}`}
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            autoCapitalize="none"
          />
          <input
            className={`login-input ${error ? 'login-input-error' : ''}`}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p className="login-error">Usuário ou senha incorretos</p>}
          <button className="login-btn" type="submit" disabled={loading || !username || !password}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
