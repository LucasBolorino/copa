import { useState } from 'react';
import type { PageType } from './types';
import { useCollection } from './hooks/useCollection';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import CollectionPage from './components/CollectionPage';
import StatsPage from './components/StatsPage';

export default function App() {
  const [page, setPage] = useState<PageType>('inicio');
  const { stats, toggle, getQuantity, resetCollection } = useCollection();

  return (
    <div className="app">
      <div className="app-content">
        {page === 'inicio' && (
          <HomePage stats={stats} setPage={setPage} />
        )}
        {page === 'colecao' && (
          <CollectionPage
            getQuantity={getQuantity}
            toggle={toggle}
            obtained={stats.obtained}
          />
        )}
        {page === 'estatisticas' && (
          <StatsPage
            getQuantity={getQuantity}
            resetCollection={resetCollection}
          />
        )}
      </div>
      <NavBar current={page} setPage={setPage} />
    </div>
  );
}
