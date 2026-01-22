import { useState, useEffect, useCallback } from 'react';
import type { Favorite } from './types';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  updateFavoriteNickname,
} from './storage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const add = useCallback((favorite: Omit<Favorite, 'id' | 'createdAt'>) => {
    const result = addFavorite(favorite);
    if (result) {
      setFavorites(getFavorites());
    }
    return result;
  }, []);

  const remove = useCallback((id: string) => {
    const result = removeFavorite(id);
    if (result) {
      setFavorites(getFavorites());
    }
    return result;
  }, []);

  const updateNickname = useCallback((id: string, nickname: string) => {
    const result = updateFavoriteNickname(id, nickname);
    if (result) {
      setFavorites(getFavorites());
    }
    return result;
  }, []);

  return {
    favorites,
    add,
    remove,
    updateNickname,
    isFull: favorites.length >= 6,
  };
}
