import { useState, useEffect, useCallback } from 'react';
import type { Collection } from '../types';
import { ALL_TEAMS, TOTAL_STICKERS } from '../data/teams';

const STORAGE_KEY = 'copa2026_collection';

function loadCollection(): Collection {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCollection(col: Collection) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(col));
}

export function useCollection() {
  const [collection, setCollection] = useState<Collection>(loadCollection);

  useEffect(() => {
    saveCollection(collection);
  }, [collection]);

  const setQuantity = useCallback((stickerId: string, quantity: number) => {
    setCollection(prev => {
      const next = { ...prev };
      if (quantity <= 0) {
        delete next[stickerId];
      } else {
        next[stickerId] = { quantity };
      }
      return next;
    });
  }, []);

  const increment = useCallback((stickerId: string) => {
    setCollection(prev => {
      const current = prev[stickerId]?.quantity ?? 0;
      return { ...prev, [stickerId]: { quantity: current + 1 } };
    });
  }, []);

  const decrement = useCallback((stickerId: string) => {
    setCollection(prev => {
      const current = prev[stickerId]?.quantity ?? 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[stickerId];
        return next;
      }
      return { ...prev, [stickerId]: { quantity: current - 1 } };
    });
  }, []);

  const toggle = useCallback((stickerId: string) => {
    setCollection(prev => {
      if (prev[stickerId]?.quantity >= 1) {
        const next = { ...prev };
        delete next[stickerId];
        return next;
      }
      return { ...prev, [stickerId]: { quantity: 1 } };
    });
  }, []);

  const getQuantity = useCallback((stickerId: string): number => {
    return collection[stickerId]?.quantity ?? 0;
  }, [collection]);

  const stats = (() => {
    let obtained = 0;

    for (const team of ALL_TEAMS) {
      for (const sticker of team.stickers) {
        const qty = collection[sticker.id]?.quantity ?? 0;
        if (qty >= 1) obtained++;
      }
    }

    return {
      obtained,
      missing: TOTAL_STICKERS - obtained,
      total: TOTAL_STICKERS,
      progress: Math.round((obtained / TOTAL_STICKERS) * 100),
    };
  })();

  const resetCollection = useCallback(() => {
    setCollection({});
  }, []);

  return { collection, stats, increment, decrement, toggle, getQuantity, setQuantity, resetCollection };
}
