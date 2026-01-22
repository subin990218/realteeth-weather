import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from './api';

export function useWeather(lat: number | null, lon: number | null) {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => fetchWeather(lat!, lon!),
    enabled: lat !== null && lon !== null,
    staleTime: 1000 * 60 * 10, // 10분간 fresh 상태 유지
    gcTime: 1000 * 60 * 30, // 30분간 캐시 유지
  });
}
