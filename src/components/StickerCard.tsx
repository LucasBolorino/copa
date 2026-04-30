import type { Sticker } from '../types';

interface Props {
  sticker: Sticker;
  quantity: number;
  teamColor: string;
  onToggle: () => void;
}

export default function StickerCard({ sticker, quantity, onToggle }: Props) {
  const isObtained = quantity >= 1;
  const isShiny = sticker.shiny === true;
  const obtainedColor = isShiny ? '#FFB800' : '#4CAF50';
  const missingBorder = isShiny ? '#C8920A' : '#3a3a3c';
  const activeColor = isObtained ? obtainedColor : missingBorder;

  return (
    <div
      className={`sticker-card ${isObtained ? 'obtained' : 'missing'}`}
      onClick={onToggle}
      role="button"
      aria-pressed={isObtained}
    >
      <div
        className="sticker-inner"
        style={{ borderColor: activeColor, borderStyle: isObtained ? 'solid' : 'dashed' }}
      >
        <span
          className="sticker-id"
          style={{ color: isObtained ? obtainedColor : '#aaa' }}
        >
          {sticker.id}
        </span>
        <span className="sticker-status-icon" style={{ color: activeColor }}>
          {isObtained ? '✔' : '✕'}
        </span>
      </div>
    </div>
  );
}
