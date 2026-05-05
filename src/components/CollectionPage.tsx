import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import type { FilterType, Team } from '../types';
import { ALL_TEAMS, TOTAL_STICKERS } from '../data/teams';
import StickerCard from './StickerCard';
import TeamFlag from './TeamFlag';
import { useDragScroll } from '../hooks/useDragScroll';

interface Props {
  getQuantity: (id: string) => number;
  toggle: (id: string) => void;
  obtained: number;
}

export default function CollectionPage({ getQuantity, toggle, obtained }: Props) {
  const [filter, setFilter] = useState<FilterType>('todas');
  const [activeTeamCode, setActiveTeamCode] = useState<string>('TODAS');
  const [search, setSearch] = useState('');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  const scrollBodyRef = useRef<HTMLDivElement>(null);
  const isScrollingFromClick = useRef(false);
  const dragScroll = useDragScroll();

  const FILTERS: { key: FilterType; label: string }[] = [
    { key: 'todas', label: 'Todas' },
    { key: 'obtidas', label: 'Obtidas' },
    { key: 'faltantes', label: 'Faltantes' },
  ];

  // Scroll the active tab button into view inside the tabs container
  const scrollTabIntoView = useCallback((code: string) => {
    const tabEl = tabRefs.current[code];
    const container = tabsContainerRef.current;
    if (!tabEl || !container) return;
    const tabLeft = tabEl.offsetLeft;
    const tabWidth = tabEl.offsetWidth;
    const containerWidth = container.offsetWidth;
    const scrollTarget = tabLeft - containerWidth / 2 + tabWidth / 2;
    container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  }, []);

  // Click a tab → jump to section
  function handleTabClick(code: string) {
    isScrollingFromClick.current = true;
    setActiveTeamCode(code);
    scrollTabIntoView(code);
    if (code === 'TODAS') {
      scrollBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = sectionRefs.current[code];
      if (el) {
        const headerH = stickyHeaderRef.current?.offsetHeight ?? 0;
        const body = scrollBodyRef.current;
        if (body) {
          const top = el.offsetTop - headerH - 8;
          body.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
    setTimeout(() => { isScrollingFromClick.current = false; }, 800);
  }

  // Scroll listener: sync active tab with visible section
  useEffect(() => {
    const body = scrollBodyRef.current;
    if (!body) return;
    let lastScrollTop = 0;

    function onScroll() {
      const scrollTop = body!.scrollTop;

      // Hide/show navbar based on scroll direction
      if (scrollTop > lastScrollTop && scrollTop > 40) {
        document.body.classList.add('scroll-down');
      } else {
        document.body.classList.remove('scroll-down');
      }
      lastScrollTop = scrollTop;

      if (isScrollingFromClick.current) return;
      const bodyRect = body!.getBoundingClientRect();
      let bestCode: string | null = null;
      let bestTop = -Infinity;
      for (const [code, el] of Object.entries(sectionRefs.current)) {
        if (!el) continue;
        const top = el.getBoundingClientRect().top - bodyRect.top;
        if (top <= 100 && top > bestTop) {
          bestTop = top;
          bestCode = code;
        }
      }
      if (bestCode && bestCode !== activeTeamCode) {
        setActiveTeamCode(bestCode);
        scrollTabIntoView(bestCode);
      }
    }

    body.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      body.removeEventListener('scroll', onScroll);
      document.body.classList.remove('scroll-down');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTabIntoView]);

  const visibleTeams = useMemo(() => {
    return ALL_TEAMS.filter(team => {
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        return team.stickers.some(s => s.id.toLowerCase().includes(q));
      }
      return true;
    });
  }, [search]);

  function getFilteredStickers(team: Team) {
    let stickers = team.stickers;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      stickers = stickers.filter(s => s.id.toLowerCase().includes(q));
    }
    switch (filter) {
      case 'obtidas':  return stickers.filter(s => getQuantity(s.id) >= 1);
      case 'faltantes': return stickers.filter(s => getQuantity(s.id) === 0);
      default: return stickers;
    }
  }

  const teamsWithStickers = visibleTeams
    .map(team => ({ team, stickers: getFilteredStickers(team) }))
    .filter(({ stickers }) => stickers.length > 0);

  const pct = Math.floor((obtained / TOTAL_STICKERS) * 100);

  return (
    <div className="collection-page-wrap">

      {/* ── Single scrollable body ── */}
      <div className="collection-scroll-body" ref={scrollBodyRef}>

        {/* Header — rola junto */}
        <div className="collection-header-scroll">
          <div className="collection-header">
            <div>
              <h2 className="page-title">Minha Coleção</h2>
              <p className="page-subtitle">Gerencie seu estoque oficial</p>
            </div>
            <div className="collection-badge">
              <span className="collection-pct">{pct}%</span>
            </div>
          </div>
          <div className="collection-progress-bar-wrap">
            <div className="collection-progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="collection-count">{obtained} de {TOTAL_STICKERS} figurinhas</p>
        </div>

        {/* Controles — ficam fixos ao rolar */}
        <div className="collection-sticky-header" ref={stickyHeaderRef}>

          {/* Search */}
          <div className="search-wrap">
            <input
              className="search-input"
              type="text"
              placeholder="Buscar figurinha ou seleção..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="filter-tabs">
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`filter-tab ${filter === f.key ? 'active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Team tabs — draggable */}
          <div
            className="conf-tabs"
            ref={(el) => {
              (dragScroll.ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
              tabsContainerRef.current = el;
            }}
            onMouseDown={dragScroll.onMouseDown}
            onMouseMove={dragScroll.onMouseMove}
            onMouseUp={dragScroll.onMouseUp}
            onMouseLeave={dragScroll.onMouseLeave}
            style={{ cursor: 'grab' }}
          >
            <button
              ref={el => { tabRefs.current['TODAS'] = el; }}
              className={`conf-tab ${activeTeamCode === 'TODAS' ? 'active' : ''}`}
              onClick={() => handleTabClick('TODAS')}
            >
              Todas
            </button>
            {ALL_TEAMS.map(team => (
              <button
                key={team.code}
                ref={el => { tabRefs.current[team.code] = el; }}
                className={`conf-tab ${activeTeamCode === team.code ? 'active' : ''}`}
                onClick={() => handleTabClick(team.code)}
              >
                {team.name}
              </button>
            ))}
          </div>
        </div>

        <div className="sticker-sections">
          {teamsWithStickers.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p>Nenhuma figurinha encontrada</p>
            </div>
          ) : (
            teamsWithStickers.map(({ team, stickers }) => {
              const safeColor = team.color === '#FFFFFF' || team.color === '#000000' ? '#4CAF50' : team.color;
              return (
                <div
                  key={team.code}
                  className="team-section"
                  data-team-code={team.code}
                  ref={el => { sectionRefs.current[team.code] = el; }}
                >
                  <div className="section-divider">
                    <span className="section-divider-name">{team.name}</span>
                    <div className="team-divider" />
                    <TeamFlag teamCode={team.code} teamColor={safeColor} size={18} />
                  </div>

                  <div className="stickers-grid">
                    {stickers.map(sticker => (
                      <StickerCard
                        key={sticker.id}
                        sticker={sticker}
                        quantity={getQuantity(sticker.id)}
                        teamColor={safeColor}
                        onToggle={() => toggle(sticker.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
