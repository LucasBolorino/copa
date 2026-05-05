import { useState, useEffect, useCallback } from 'react';
import type { Collection } from '../types';
import { ALL_TEAMS, TOTAL_STICKERS } from '../data/teams';

export function useCollection() {
  const [collection, setCollection] = useState<Collection>({});

  useEffect(() => {
    fetch('/api/collection')
      .then(r => r.json())
      .then(setCollection)
      .catch(() => {});
  }, []);

  const toggle = useCallback((stickerId: string) => {
    setCollection(prev => {
      const current = prev[stickerId]?.quantity ?? 0;
      const quantity = current >= 1 ? 0 : 1;
      fetch(`/api/collection/${stickerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      }).catch(() => {});
      if (quantity <= 0) {
        const next = { ...prev };
        delete next[stickerId];
        return next;
      }
      return { ...prev, [stickerId]: { quantity } };
    });
  }, []);

  const getQuantity = useCallback((stickerId: string): number => {
    return collection[stickerId]?.quantity ?? 0;
  }, [collection]);

  const resetCollection = useCallback(() => {
    setCollection({});
    fetch('/api/collection', { method: 'DELETE' }).catch(() => {});
  }, []);

  const stats = (() => {
    let obtained = 0;
    for (const team of ALL_TEAMS)
      for (const sticker of team.stickers)
        if ((collection[sticker.id]?.quantity ?? 0) >= 1) obtained++;
    return {
      obtained,
      missing: TOTAL_STICKERS - obtained,
      total: TOTAL_STICKERS,
      progress: Math.floor((obtained / TOTAL_STICKERS) * 100),
    };
  })();

  return { stats, toggle, getQuantity, resetCollection };
}
