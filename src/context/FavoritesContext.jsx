import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addFavorite = useCallback((book) => {
    setFavorites((prev) => {
      if (prev.some((b) => b.id === book.id)) return prev;
      const updated = [...prev, book];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // useMemo used for derived state, as required by the performance spec
  const favoriteIds = useMemo(() => favorites.map((b) => b.id), [favorites]);

  const isFavorite = useCallback((id) => favoriteIds.includes(id), [favoriteIds]);

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite, favoriteIds }),
    [favorites, addFavorite, removeFavorite, isFavorite, favoriteIds]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
