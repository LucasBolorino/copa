import { useState, useEffect } from 'react';
import type { PageType } from './types';
import { useCollection } from './hooks/useCollection';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import CollectionPage from './components/CollectionPage';
import StatsPage from './components/StatsPage';
import LoginPage from './components/LoginPage';
import UsersPage from './components/UsersPage';
import SettingsPage from './components/SettingsPage';

function AuthenticatedApp({ username }: { username: string }) {
  const [page, setPage] = useState<PageType>('inicio');
  const { stats, toggle, getQuantity, resetCollection } = useCollection();

  return (
    <div className="app">
      <div className="app-content">
        {page === 'inicio' && <HomePage stats={stats} setPage={setPage} getQuantity={getQuantity} />}
        {page === 'colecao' && (
          <CollectionPage getQuantity={getQuantity} toggle={toggle} obtained={stats.obtained} />
        )}
        {page === 'estatisticas' && (
          <StatsPage getQuantity={getQuantity} resetCollection={resetCollection} />
        )}
        {page === 'usuarios' && <UsersPage />}
        {page === 'configuracoes' && <SettingsPage />}
      </div>
      <NavBar current={page} setPage={setPage} username={username} />
    </div>
  );
}

export default function App() {
  const [auth, setAuth] = useState<{ ok: boolean; username: string } | null>(null);

  useEffect(() => {
    fetch('/api/auth/check')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => setAuth({ ok: true, username: data.username }))
      .catch(() => setAuth({ ok: false, username: '' }));
  }, []);

  if (auth === null) return null;
  if (!auth.ok) return <LoginPage onLogin={(username) => setAuth({ ok: true, username })} />;

  return <AuthenticatedApp username={auth.username} />;
}
