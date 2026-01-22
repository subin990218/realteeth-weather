import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Favorite } from '../../entities/location/types';
import { useWeather } from '../../entities/weather/hooks';
import { RemoveFavoriteButton } from '../../features/remove-favorite';
import { EditNicknameModal } from '../../features/edit-nickname';

interface FavoriteCardProps {
  favorite: Favorite;
  onUpdate: () => void;
}

const WEATHER_ICONS: Record<string, string> = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '☁️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️',
};

export function FavoriteCard({ favorite, onUpdate }: FavoriteCardProps) {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { data: weatherData, isLoading } = useWeather(favorite.lat, favorite.lon);
  const weather = weatherData?.current;

  const handleClick = () => {
    navigate(`/detail/${favorite.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditOpen(true);
  };

  const icon = weather ? WEATHER_ICONS[weather.icon] || '🌡️' : '⏳';

  return (
    <>
      <div
        onClick={handleClick}
        className="bg-white rounded-xl p-3 md:p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      >
        <div className="flex items-start justify-between mb-1 md:mb-2">
          <h3 className="font-semibold text-gray-800 truncate flex-1 text-sm md:text-base">
            {favorite.nickname}
          </h3>
          <span className="text-xl md:text-2xl ml-2">{icon}</span>
        </div>

        {isLoading ? (
          <div className="text-gray-400 text-xs md:text-sm">로딩중...</div>
        ) : weather ? (
          <>
            <p className="text-2xl md:text-3xl font-light text-gray-800">{weather.temp}°</p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              {weather.tempMin}° / {weather.tempMax}°
            </p>
          </>
        ) : (
          <p className="text-xs md:text-sm text-gray-400">정보 없음</p>
        )}

        <div className="flex gap-2 mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-100">
          <button
            onClick={handleEditClick}
            className="px-2 py-1 text-xs md:text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
          >
            편집
          </button>
          <RemoveFavoriteButton id={favorite.id} onSuccess={onUpdate} />
        </div>
      </div>

      <EditNicknameModal
        id={favorite.id}
        currentNickname={favorite.nickname}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          onUpdate();
        }}
      />
    </>
  );
}
