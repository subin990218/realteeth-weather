import { geocodingClient } from '../api/client';

export interface GeoLocation {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

export async function getCoordinatesFromAddress(address: string): Promise<GeoLocation | null> {
  try {
    const response = await geocodingClient.get('/direct', {
      params: {
        q: `${address}, South Korea`,
        limit: 1,
      },
    });

    if (response.data.length === 0) {
      return null;
    }

    const { lat, lon, name, country } = response.data[0];
    return { lat, lon, name, country };
  } catch {
    return null;
  }
}

export async function getAddressFromCoordinates(lat: number, lon: number): Promise<string | null> {
  try {
    const response = await geocodingClient.get('/reverse', {
      params: {
        lat,
        lon,
        limit: 1,
      },
    });

    if (response.data.length === 0) {
      return null;
    }

    return response.data[0].name;
  } catch {
    return null;
  }
}

export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  });
}
