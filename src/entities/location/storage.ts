import type { Favorite } from './types';

const STORAGE_KEY = 'weather-favorites';
const MAX_FAVORITES = 6;

function roundCoord(coord: number): number {
  return Math.round(coord * 100) / 100;
}

export function getFavorites(): Favorite[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function addFavorite(favorite: Omit<Favorite, 'id' | 'createdAt'>): Favorite | null {
  const favorites = getFavorites();

  if (favorites.length >= MAX_FAVORITES) {
    return null;
  }

  const isDuplicate = favorites.some(
    (f) => roundCoord(f.lat) === roundCoord(favorite.lat) &&
           roundCoord(f.lon) === roundCoord(favorite.lon)
  );
  if (isDuplicate) {
    return null;
  }

  const newFavorite: Favorite = {
    ...favorite,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const updated = [...favorites, newFavorite];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return newFavorite;
}

export function removeFavorite(id: string): boolean {
  const favorites = getFavorites();
  const filtered = favorites.filter((f) => f.id !== id);

  if (filtered.length === favorites.length) {
    return false;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function updateFavoriteNickname(id: string, nickname: string): boolean {
  const favorites = getFavorites();
  const index = favorites.findIndex((f) => f.id === id);

  if (index === -1) {
    return false;
  }

  favorites[index].nickname = nickname;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return true;
}

export function isFavorite(lat: number, lon: number): boolean {
  const favorites = getFavorites();
  return favorites.some(
    (f) => roundCoord(f.lat) === roundCoord(lat) &&
           roundCoord(f.lon) === roundCoord(lon)
  );
}

export function getFavoriteById(id: string): Favorite | null {
  const favorites = getFavorites();
  return favorites.find((f) => f.id === id) || null;
}
