import { useState, useEffect } from 'react';
import { useWeather } from '../entities/weather/hooks';
import { getCoordinatesFromAddress, getCurrentPosition } from '../shared/lib/geocoding';
import { getNearestKoreanAddress } from '../shared/lib/coordinates';
import type { District } from '../shared/lib/districts';
import { WeatherCard, SearchBar, FavoriteList, HourlyChart } from '../widgets';
import { ToggleFavoriteButton } from '../features/toggle-favorite';

const DEFAULT_LOCATION = {
  address: '서울특별시',
  lat: 37.5665,
  lon: 126.978,
};

export function MainPage() {
  const [location, setLocation] = useState<{
    address: string;
    lat: number;
    lon: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favoritesKey, setFavoritesKey] = useState(0);

  const { data: weather, isLoading: isWeatherLoading } = useWeather(
    location?.lat ?? null,
    location?.lon ?? null
  );

  useEffect(() => {
    async function initLocation() {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const nearestAddress = getNearestKoreanAddress(latitude, longitude);

        setLocation({
          address: nearestAddress,
          lat: latitude,
          lon: longitude,
        });
      } catch {
        setLocation(DEFAULT_LOCATION);
      } finally {
        setIsLoading(false);
      }
    }

    initLocation();
  }, []);

  const handleSelectLocation = async (district: District) => {
    setIsLoading(true);
    setError(null);

    const coords = await getCoordinatesFromAddress(district.fullAddress);

    if (coords) {
      setLocation({
        address: district.fullAddress,
        lat: coords.lat,
        lon: coords.lon,
      });
    } else {
      setError('해당 장소의 정보가 제공되지 않습니다.');
    }

    setIsLoading(false);
  };

  const handleFavoriteToggle = () => {
    setFavoritesKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <SearchBar onSelectLocation={handleSelectLocation} />

        <div className="mt-4">
          {isLoading || isWeatherLoading ? (
            <div className="bg-white rounded-2xl p-8 shadow-md text-center">
              <p className="text-gray-500">날씨 정보를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl p-8 shadow-md text-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : weather?.current && location ? (
            <>
              <WeatherCard weather={weather.current} address={location.address} />
              <div className="mt-3 flex justify-end">
                <ToggleFavoriteButton
                  address={location.address}
                  lat={location.lat}
                  lon={location.lon}
                  onToggle={handleFavoriteToggle}
                />
              </div>
              {weather.hourly.length > 0 && (
                <div className="mt-4">
                  <HourlyChart data={weather.hourly} />
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-2xl p-8 shadow-md text-center">
              <p className="text-gray-500">날씨 정보를 불러올 수 없습니다.</p>
            </div>
          )}
        </div>

        <FavoriteList key={favoritesKey} />
      </div>
    </div>
  );
}
