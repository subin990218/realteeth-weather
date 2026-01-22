import { useQuery } from '@tanstack/react-query';
import { fetchWeather, fetchCurrentWeather } from './api';

export function useWeather(lat: number | null, lon: number | null) {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => fetchWeather(lat!, lon!),
    enabled: lat !== null && lon !== null,
    staleTime: 1000 * 60 * 10,
  });
}

export function useCurrentWeather(lat: number | null, lon: number | null) {
  return useQuery({
    queryKey: ['currentWeather', lat, lon],
    queryFn: () => fetchCurrentWeather(lat!, lon!),
    enabled: lat !== null && lon !== null,
    staleTime: 1000 * 60 * 10,
  });
}
