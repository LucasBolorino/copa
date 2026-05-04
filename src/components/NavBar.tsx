import { Home, BookOpen, BarChart2, Users } from 'lucide-react';
import type { PageType } from '../types';

interface Props {
  current: PageType;
  setPage: (p: PageType) => void;
}

const NAV_ITEMS: { key: PageType; label: string; Icon: typeof Home }[] = [
  { key: 'inicio', label: 'Início', Icon: Home },
  { key: 'colecao', label: 'Coleção', Icon: BookOpen },
  { key: 'estatisticas', label: 'Stats', Icon: BarChart2 },
  { key: 'usuarios', label: 'Usuários', Icon: Users },
];

export default function NavBar({ current, setPage }: Props) {
  return (
    <nav className="navbar">
      {NAV_ITEMS.map(({ key, label, Icon }) => (
        <button
          key={key}
          className={`nav-item ${current === key ? 'active' : ''}`}
          onClick={() => setPage(key)}
        >
          <Icon size={22} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
