import { useState } from 'react';

interface Props {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      onLogin();
    } else {
      setError(true);
      setPassword('');
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-icon">⚽</div>
        <h1 className="login-title">Copa 2026</h1>
        <p className="login-sub">Digite a senha para acessar</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            className={`login-input ${error ? 'login-input-error' : ''}`}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="login-error">Senha incorreta</p>}
          <button className="login-btn" type="submit" disabled={loading || !password}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
