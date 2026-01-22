import { useState, useEffect } from 'react';
import { isFavorite, addFavorite, getFavorites, removeFavorite } from '../../entities/location/storage';

interface ToggleFavoriteButtonProps {
  address: string;
  lat: number;
  lon: number;
  onToggle?: () => void;
}

export function ToggleFavoriteButton({
  address,
  lat,
  lon,
  onToggle,
}: ToggleFavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(lat, lon));
  }, [lat, lon]);

  const handleClick = () => {
    if (isFav) {
      const favorites = getFavorites();
      const target = favorites.find(
        (f) => Math.round(f.lat * 100) === Math.round(lat * 100) &&
               Math.round(f.lon * 100) === Math.round(lon * 100)
      );
      if (target) {
        removeFavorite(target.id);
        setIsFav(false);
        onToggle?.();
      }
    } else {
      const result = addFavorite({ address, lat, lon, nickname: address });
      if (result) {
        setIsFav(true);
        onToggle?.();
      } else {
        alert('즐겨찾기는 최대 6개까지 추가할 수 있습니다.');
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1 px-2.5 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-lg transition-colors ${
        isFav
          ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500'
          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
      }`}
    >
      <span>{isFav ? '★' : '☆'}</span>
      <span>{isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}</span>
    </button>
  );
}
