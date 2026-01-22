import type { WeatherData } from '../../entities/weather/types';

interface WeatherCardProps {
  weather: WeatherData;
  address: string;
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

export function WeatherCard({ weather, address }: WeatherCardProps) {
  const icon = WEATHER_ICONS[weather.icon] || '🌡️';

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
      <p className="text-lg opacity-90 mb-2">{address}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-6xl font-light">{weather.temp}°</p>
          <p className="text-lg mt-2">{weather.description}</p>
          <p className="text-sm opacity-80 mt-1">
            최저 {weather.tempMin}° / 최고 {weather.tempMax}°
          </p>
        </div>
        <div className="text-7xl">{icon}</div>
      </div>
      <div className="flex gap-6 mt-4 pt-4 border-t border-white/20 text-sm">
        <span>습도 {weather.humidity}%</span>
        <span>풍속 {weather.windSpeed}m/s</span>
      </div>
    </div>
  );
}
