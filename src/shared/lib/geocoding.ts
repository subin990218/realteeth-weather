import { getCoordinatesFromKoreanAddress } from './coordinates';

export interface GeoLocation {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

export async function getCoordinatesFromAddress(address: string): Promise<GeoLocation | null> {
  const coords = getCoordinatesFromKoreanAddress(address);

  if (coords) {
    return {
      lat: coords.lat,
      lon: coords.lon,
      name: address,
      country: 'KR',
    };
  }

  return null;
}

export async function getAddressFromCoordinates(_lat: number, _lon: number): Promise<string | null> {
  return null;
}

export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000,
    });
  });
}
