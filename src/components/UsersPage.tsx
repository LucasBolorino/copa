import { useState, useEffect } from 'react';
import { ALL_TEAMS } from '../data/teams';
import type { Collection } from '../types';
import StickerCard from './StickerCard';

interface UserStat {
  username: string;
  obtained: number;
  pct: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserStat[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [theirCollection, setTheirCollection] = useState<Collection>({});

  useEffect(() => {
    fetch('/api/users/stats')
      .then(r => r.json())
      .then(setUsers)
      .catch(() => {});
  }, []);

  function handleSelectUser(username: string) {
    setSelected(username);
    fetch(`/api/users/${encodeURIComponent(username)}/collection`)
      .then(r => r.json())
      .then(setTheirCollection)
      .catch(() => {});
  }

  if (selected !== null) {
    return (
      <div className="page stats-page">
        <div className="collection-header">
          <div>
            <button
              onClick={() => { setSelected(null); setTheirCollection({}); }}
              style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 14, padding: 0, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}
            >
              ← Voltar
            </button>
            <h2 className="page-title">Faltantes de {selected}</h2>
          </div>
          <span className="home-mascot">👥</span>
        </div>

        {ALL_TEAMS.map((team, idx) => {
          const missing = team.stickers.filter(s => !theirCollection[s.id]?.quantity);
          if (missing.length === 0) return null;
          return (
            <div key={team.code}>
              {idx > 0 && <div className="section-divider" />}
              <div className="team-section">
                <h3 className="team-name">{team.name}</h3>
                <div className="stickers-grid">
                  {missing.map(sticker => (
                    <StickerCard
                      key={sticker.id}
                      sticker={sticker}
                      quantity={0}
                      teamColor={team.color}
                      onToggle={() => {}}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="page stats-page">
      <div className="collection-header">
        <div>
          <h2 className="page-title">Usuários</h2>
          <p className="page-subtitle">Ranking da coleção</p>
        </div>
        <span className="home-mascot">👥</span>
      </div>

      <div className="card">
        <div className="team-ranking">
          {users.map(({ username, obtained, pct }, idx) => (
            <div
              key={username}
              className="ranking-row"
              onClick={() => handleSelectUser(username)}
              style={{ cursor: 'pointer' }}
            >
              <span className="ranking-pos">{idx + 1}</span>
              <div className="ranking-info">
                <span className="ranking-name" style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {username}
                  <span style={{ color: '#4CAF50', fontSize: 12 }}>ver faltantes ›</span>
                </span>
                <div className="ranking-bar-wrap">
                  <div
                    className="ranking-bar-fill"
                    style={{ width: `${pct}%`, background: '#4CAF50' }}
                  />
                </div>
              </div>
              <div className="ranking-numbers">
                <span className="ranking-pct">{pct}%</span>
                <span className="ranking-detail">{obtained}/994</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
