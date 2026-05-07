import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error' | 'exists'>('idle');
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/settings/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setStatus('ok');
      setUsername('');
      setPassword('');
    } else {
      const data = await res.json();
      setStatus(data.error === 'username already exists' ? 'exists' : 'error');
    }
  }

  return (
    <div className="page stats-page">
      <div className="collection-header">
        <div>
          <h2 className="page-title">Configurações</h2>
          <p className="page-subtitle">Gerenciar usuários</p>
        </div>
        <span className="home-mascot">⚙️</span>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Criar novo usuário</span>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            className="search-input"
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoCapitalize="none"
          />
          <div style={{ position: 'relative' }}>
            <input
              className="search-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingRight: 40, width: '100%', boxSizing: 'border-box' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {status === 'ok' && <p style={{ color: '#4CAF50', fontSize: 13 }}>Usuário criado com sucesso!</p>}
          {status === 'exists' && <p style={{ color: '#ef4444', fontSize: 13 }}>Esse usuário já existe.</p>}
          {status === 'error' && <p style={{ color: '#ef4444', fontSize: 13 }}>Erro ao criar usuário.</p>}
          <button
            className="login-btn"
            type="submit"
            disabled={status === 'loading' || !username || !password}
          >
            {status === 'loading' ? 'Criando...' : 'Criar usuário'}
          </button>
        </form>
      </div>
    </div>
  );
}
