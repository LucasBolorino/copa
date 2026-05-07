import { Home, BookOpen, BarChart2, Users, Settings } from 'lucide-react';
import type { PageType } from '../types';

interface Props {
  current: PageType;
  setPage: (p: PageType) => void;
  username: string;
}

export default function NavBar({ current, setPage, username }: Props) {
  const items = [
    { key: 'inicio' as PageType, label: 'Início', Icon: Home },
    { key: 'colecao' as PageType, label: 'Coleção', Icon: BookOpen },
    { key: 'estatisticas' as PageType, label: 'Stats', Icon: BarChart2 },
    { key: 'usuarios' as PageType, label: 'Usuários', Icon: Users },
    ...(username === 'bolo' ? [{ key: 'configuracoes' as PageType, label: 'Config', Icon: Settings }] : []),
  ];

  return (
    <nav className="navbar">
      {items.map(({ key, label, Icon }) => (
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
