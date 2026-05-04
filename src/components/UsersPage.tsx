import { useState, useEffect } from 'react';

interface UserStat {
  username: string;
  obtained: number;
  pct: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserStat[]>([]);

  useEffect(() => {
    fetch('/api/users/stats')
      .then(r => r.json())
      .then(setUsers)
      .catch(() => {});
  }, []);

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
            <div key={username} className="ranking-row">
              <span className="ranking-pos">{idx + 1}</span>
              <div className="ranking-info">
                <span className="ranking-name" style={{ fontSize: '14px' }}>{username}</span>
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
