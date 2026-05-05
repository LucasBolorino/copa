import { ALL_TEAMS, CONFEDERATION_LABELS } from '../data/teams';
import TeamFlag from './TeamFlag';

interface Props {
  getQuantity: (id: string) => number;
  resetCollection: () => void;
}

export default function StatsPage({ getQuantity, resetCollection }: Props) {
  const confStats = ALL_TEAMS.reduce((acc, team) => {
    const conf = team.confederation;
    if (!acc[conf]) acc[conf] = { obtained: 0, total: 0 };
    team.stickers.forEach(s => {
      acc[conf].total++;
      if (getQuantity(s.id) >= 1) acc[conf].obtained++;
    });
    return acc;
  }, {} as Record<string, { obtained: number; total: number }>);

  const teamStats = ALL_TEAMS.map(team => {
    const total = team.stickers.length;
    const obtained = team.stickers.filter(s => getQuantity(s.id) >= 1).length;
    return { team, total, obtained, pct: Math.floor((obtained / total) * 100) };
  }).sort((a, b) => b.pct - a.pct);

  function handleReset() {
    if (window.confirm('Tem certeza que deseja apagar toda a coleção? Esta ação não pode ser desfeita.')) {
      resetCollection();
    }
  }

  return (
    <div className="page stats-page">
      <div className="collection-header">
        <div>
          <h2 className="page-title">Estatísticas</h2>
          <p className="page-subtitle">Seu progresso detalhado</p>
        </div>
        <span className="home-mascot">📊</span>
      </div>

      {/* Per confederation */}
      <div className="card">
        <h3 className="section-title">Por Confederação</h3>
        {Object.entries(confStats).map(([conf, { obtained, total }]) => {
          const pct = Math.floor((obtained / total) * 100);
          return (
            <div key={conf} className="conf-stat-row">
              <div className="conf-stat-info">
                <span className="conf-stat-name">{CONFEDERATION_LABELS[conf] ?? conf}</span>
                <span className="conf-stat-count">{obtained}/{total}</span>
              </div>
              <div className="conf-stat-bar-wrap">
                <div className="conf-stat-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="conf-stat-pct">{pct}%</span>
            </div>
          );
        })}
      </div>

      {/* Per team ranking */}
      <div className="card">
        <h3 className="section-title">Ranking por Seleção</h3>
        <div className="team-ranking">
          {teamStats.map(({ team, obtained, total, pct }, idx) => (
            <div key={team.code} className="ranking-row">
              <span className="ranking-pos">{idx + 1}</span>
              <TeamFlag teamCode={team.code} teamColor={team.color} size={20} />
              <div className="ranking-info">
                <span className="ranking-name">{team.name}</span>
                <div className="ranking-bar-wrap">
                  <div
                    className="ranking-bar-fill"
                    style={{
                      width: `${pct}%`,
                      background: team.color === '#FFFFFF' || team.color === '#000000' ? '#4CAF50' : team.color,
                    }}
                  />
                </div>
              </div>
              <div className="ranking-numbers">
                <span className="ranking-pct">{pct}%</span>
                <span className="ranking-detail">{obtained}/{total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="card danger-card">
        <h3 className="section-title danger-title">Zona de Perigo</h3>
        <p className="danger-desc">Apagar toda a coleção permanentemente.</p>
        <button className="danger-btn" onClick={handleReset}>
          Resetar Coleção
        </button>
      </div>
    </div>
  );
}
