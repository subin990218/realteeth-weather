import { useState, useEffect } from 'react';
import { getFavorites } from '../../entities/location/storage';
import type { Favorite } from '../../entities/location/types';
import { FavoriteCard } from './FavoriteCard';

export function FavoriteList() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    setFavorites(getFavorites());
  }, [updateKey]);

  const handleUpdate = () => {
    setUpdateKey((prev) => prev + 1);
  };

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">즐겨찾기</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {favorites.map((favorite) => (
          <FavoriteCard
            key={favorite.id}
            favorite={favorite}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
}
