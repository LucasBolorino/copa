interface Props {
  teamCode: string;
  teamColor: string;
  size?: number;
}

function getTextColor(bg: string): string {
  const hex = bg.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#1a1a2e' : '#ffffff';
}

export default function TeamFlag({ teamCode, teamColor, size = 22 }: Props) {
  const bg = teamColor === '#FFFFFF' || teamColor === '#000000' || teamColor === '#FFD700'
    ? '#4CAF50'
    : teamColor;
  const color = getTextColor(bg);
  const fontSize = size * 0.45;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size * 1.7,
        height: size,
        borderRadius: 4,
        background: bg,
        color,
        fontSize,
        fontWeight: 800,
        letterSpacing: '0.5px',
        flexShrink: 0,
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        fontFamily: 'monospace',
      }}
    >
      {teamCode === 'FWC_I' || teamCode === 'FWC_C' ? 'FWC' : teamCode === 'CC' ? 'CC' : teamCode.substring(0, 3)}
    </span>
  );
}
