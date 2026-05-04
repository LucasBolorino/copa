export type StickerType = 'special' | 'badge' | 'squad' | 'player';

export interface Sticker {
  id: string;
  name: string;
  type: StickerType;
  number: number;
  shiny?: boolean;
}

export interface Team {
  code: string;
  name: string;
  flag: string;
  confederation: string;
  color: string;
  stickers: Sticker[];
}

export interface StickerState {
  quantity: number; // 0 = missing, 1 = obtained, 2+ = repeated
}

export interface Collection {
  [stickerId: string]: StickerState;
}

export type FilterType = 'todas' | 'obtidas' | 'faltantes';
export type PageType = 'inicio' | 'colecao' | 'estatisticas' | 'usuarios';
