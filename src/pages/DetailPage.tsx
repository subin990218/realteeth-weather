import { useParams, useNavigate } from 'react-router-dom';
import { useWeather } from '../entities/weather/hooks';
import { getFavoriteById } from '../entities/location/storage';
import { WeatherCard, HourlyChart } from '../widgets';
import { ToggleFavoriteButton } from '../features/toggle-favorite';

export function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const favorite = id ? getFavoriteById(id) : null;

  const { data: weather, isLoading } = useWeather(
    favorite?.lat ?? null,
    favorite?.lon ?? null
  );

  if (!favorite) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-md text-center">
            <p className="text-gray-500">즐겨찾기를 찾을 수 없습니다.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <span>←</span>
          <span>뒤로가기</span>
        </button>

        <h1 className="text-xl font-bold text-gray-800 mb-4">{favorite.nickname}</h1>

        {isLoading ? (
          <div className="bg-white rounded-2xl p-8 shadow-md text-center">
            <p className="text-gray-500">날씨 정보를 불러오는 중...</p>
          </div>
        ) : weather?.current ? (
          <div className="space-y-4">
            <WeatherCard weather={weather.current} address={favorite.address} />
            <div className="flex justify-end">
              <ToggleFavoriteButton
                address={favorite.address}
                lat={favorite.lat}
                lon={favorite.lon}
                onToggle={handleFavoriteToggle}
              />
            </div>
            <HourlyChart data={weather.hourly} />
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-md text-center">
            <p className="text-gray-500">해당 장소의 정보가 제공되지 않습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
