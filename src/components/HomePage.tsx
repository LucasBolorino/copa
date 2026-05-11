import { useState } from 'react';
import { BookOpen, Trophy, BarChart2, Copy, Check } from 'lucide-react';
import type { PageType } from '../types';
import { TEAMS, SPECIAL_INICIAL, SPECIAL_CAMPEAS, SPECIAL_CC } from '../data/teams';

interface Stats {
  obtained: number;
  missing: number;
  total: number;
  progress: number;
}

interface Props {
  stats: Stats;
  setPage: (p: PageType) => void;
  getQuantity: (id: string) => number;
}

export default function HomePage({ stats, setPage, getQuantity }: Props) {
  const [copied, setCopied] = useState(false);

  function copyMissing() {
    const sections = [
      { label: `FWC 🏆`, stickers: SPECIAL_INICIAL.stickers.filter(s => s.number <= 4) },
      { label: `FWC 🌎`, stickers: SPECIAL_INICIAL.stickers.filter(s => s.number >= 5) },
      { label: `FWC 📜`, stickers: SPECIAL_CAMPEAS.stickers },
      ...TEAMS.map(t => ({ label: `${t.code} ${t.flag}`, stickers: t.stickers })),
      { label: `CC ${SPECIAL_CC.flag}`, stickers: SPECIAL_CC.stickers },
    ];
    const lines: string[] = [];
    for (const { label, stickers } of sections) {
      const missing = stickers.filter(s => getQuantity(s.id) === 0).map(s => s.number);
      if (missing.length > 0) lines.push(`${label}: ${missing.join(', ')}`);
    }
    const text = lines.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const milestones = [
    { label: '1ª', target: 1, icon: '🌟' },
    { label: '10%', target: Math.round(stats.total * 0.1), icon: '🥉' },
    { label: '25%', target: Math.round(stats.total * 0.25), icon: '🥈' },
    { label: '50%', target: Math.round(stats.total * 0.5), icon: '🥇' },
    { label: '75%', target: Math.round(stats.total * 0.75), icon: '🏆' },
    { label: '100%', target: stats.total, icon: '👑' },
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

        <button className="action-card" onClick={copyMissing}>
          <div className="action-icon" style={{ background: 'rgba(239,68,68,0.15)' }}>
            {copied ? <Check size={22} color="#4CAF50" /> : <Copy size={22} color="#ef4444" />}
          </div>
          <div className="action-text">
            <span className="action-title">{copied ? 'Copiado!' : 'Copiar faltantes'}</span>
            <span className="action-sub">{copied ? 'Lista copiada para a área de transferência' : `${stats.missing} figurinhas para completar`}</span>
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
