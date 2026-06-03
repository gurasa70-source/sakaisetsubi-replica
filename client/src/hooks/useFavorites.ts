import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'sakaisetsubi-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // ローカルストレージから初期化
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const favoriteIds = JSON.parse(stored) as string[];
        setFavorites(new Set(favoriteIds));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // ローカルストレージに保存
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      const favoriteIds = Array.from(favorites);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favorites, isLoaded]);

  // お気に入りを追加
  const addFavorite = useCallback((workId: string) => {
    setFavorites(prev => new Set(prev).add(workId));
  }, []);

  // お気に入りを削除
  const removeFavorite = useCallback((workId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.delete(workId);
      return next;
    });
  }, []);

  // お気に入りをトグル
  const toggleFavorite = useCallback((workId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(workId)) {
        next.delete(workId);
      } else {
        next.add(workId);
      }
      return next;
    });
  }, []);

  // 特定のアイテムがお気に入りかどうかを確認
  const isFavorite = useCallback((workId: string) => {
    return favorites.has(workId);
  }, [favorites]);

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}
