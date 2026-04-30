import { BookOpen, Trophy, BarChart2 } from 'lucide-react';
import type { PageType } from '../types';

interface Stats {
  obtained: number;
  missing: number;
  total: number;
  progress: number;
}

interface Props {
  stats: Stats;
  setPage: (p: PageType) => void;
}

export default function HomePage({ stats, setPage }: Props) {
  const milestones = [
    { label: '1ª figurinha!', target: 1, icon: '🌟' },
    { label: '10% do álbum', target: Math.round(stats.total * 0.1), icon: '🥉' },
    { label: '25% do álbum', target: Math.round(stats.total * 0.25), icon: '🥈' },
    { label: '50% do álbum', target: Math.round(stats.total * 0.5), icon: '🥇' },
    { label: '75% do álbum', target: Math.round(stats.total * 0.75), icon: '🏆' },
    { label: 'Álbum completo!', target: stats.total, icon: '👑' },
  ];

  const achieved = milestones.filter(m => stats.obtained >= m.target);
  const next = milestones.find(m => stats.obtained < m.target);

  return (
    <div className="page home-page">
      {/* Header */}
      <div className="home-header">
        <div>
          <h1 className="home-title">Copa 2026</h1>
          <p className="home-subtitle">Gerencie seu Álbum da Copa do Mundo</p>
        </div>
        <div className="home-mascot">⚽</div>
      </div>

      {/* Progress Card */}
      <div className="card progress-card">
        <div className="card-header">
          <span className="card-title">Progresso do Álbum</span>
          <span className="progress-pct">{stats.progress}%</span>
        </div>
        <div className="progress-bar-wrap">
          <div
            className="progress-bar-fill"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-value obtained-color">{stats.obtained}</span>
            <span className="stat-label">Obtidas</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value missing-color">{stats.missing}</span>
            <span className="stat-label">Faltantes</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      {/* Next milestone */}
      {next && (
        <div className="card next-milestone-card">
          <div className="milestone-icon">{next.icon}</div>
          <div className="milestone-info">
            <span className="milestone-label">Próxima conquista</span>
            <span className="milestone-name">{next.label}</span>
            <span className="milestone-progress">
              {stats.obtained} / {next.target} figurinhas
            </span>
          </div>
          <div className="milestone-mini-bar-wrap">
            <div
              className="milestone-mini-bar-fill"
              style={{ width: `${Math.min(100, (stats.obtained / next.target) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="quick-actions">
        <button className="action-card" onClick={() => setPage('colecao')}>
          <div className="action-icon green">
            <BookOpen size={22} />
          </div>
          <div className="action-text">
            <span className="action-title">Gerenciar Coleção</span>
            <span className="action-sub">Adicione e gerencie suas figurinhas</span>
          </div>
          <span className="action-arrow">›</span>
        </button>

        <button className="action-card" onClick={() => setPage('estatisticas')}>
          <div className="action-icon blue">
            <BarChart2 size={22} />
          </div>
          <div className="action-text">
            <span className="action-title">Estatísticas</span>
            <span className="action-sub">Veja seu progresso por seleção</span>
          </div>
          <span className="action-arrow">›</span>
        </button>
      </div>

      {/* Achievements */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Conquistas</span>
          <Trophy size={18} className="trophy-icon" />
        </div>
        {achieved.length === 0 ? (
          <p className="empty-text">Você ainda não possui conquistas. Comece adicionando figurinhas!</p>
        ) : (
          <div className="achievements-grid">
            {achieved.map(m => (
              <div key={m.label} className="achievement-badge">
                <span className="achievement-icon">{m.icon}</span>
                <span className="achievement-label">{m.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
