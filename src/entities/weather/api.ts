import { weatherClient } from '../../shared/api/client';
import type {
  WeatherData,
  HourlyWeather,
  WeatherResponse,
  OpenWeatherCurrentResponse,
  OpenWeatherForecastResponse,
} from './types';

export async function fetchCurrentWeather(lat: number, lon: number): Promise<WeatherData | null> {
  try {
    const response = await weatherClient.get<OpenWeatherCurrentResponse>('/weather', {
      params: { lat, lon },
    });

    const data = response.data;
    return {
      location: data.name,
      temp: Math.round(data.main.temp),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      description: data.weather[0]?.description || '',
      icon: data.weather[0]?.icon || '01d',
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  } catch {
    return null;
  }
}

export async function fetchForecastWeather(lat: number, lon: number): Promise<{
  hourly: HourlyWeather[];
  todayMin: number;
  todayMax: number;
} | null> {
  try {
    const response = await weatherClient.get<OpenWeatherForecastResponse>('/forecast', {
      params: { lat, lon },
    });

    const list = response.data.list;
    const now = Date.now();
    const threeHoursAgo = now - 3 * 60 * 60 * 1000;

    // 현재 시간 기준 3시간 전 이후 데이터만 포함 (현재 블록 1개 + 미래 예보)
    const futureData = list.filter((item) => item.dt * 1000 >= threeHoursAgo);
    const next24Hours = futureData.slice(0, 8);
    const temps = next24Hours.map((item) => item.main.temp);

    const todayMin = temps.length > 0 ? Math.round(Math.min(...temps)) : 0;
    const todayMax = temps.length > 0 ? Math.round(Math.max(...temps)) : 0;

    const hourly = next24Hours.map((item) => {
      const [datePart, timePart] = item.dt_txt.split(' ');
      const [, month, day] = datePart.split('-');

      return {
        time: timePart.slice(0, 5),
        date: `${parseInt(month)}/${parseInt(day)}`,
        temp: Math.round(item.main.temp),
        icon: item.weather[0]?.icon || '01d',
      };
    });

    return { hourly, todayMin, todayMax };
  } catch {
    return null;
  }
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherResponse | null> {
  const [current, forecast] = await Promise.all([
    fetchCurrentWeather(lat, lon),
    fetchForecastWeather(lat, lon),
  ]);

  if (!current) return null;

  if (forecast) {
    current.tempMin = forecast.todayMin;
    current.tempMax = forecast.todayMax;
  }

  return {
    current,
    hourly: forecast?.hourly || [],
  };
}
