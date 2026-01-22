export interface Favorite {
  id: string;
  address: string;
  lat: number;
  lon: number;
  nickname: string;
  createdAt: string;
}

export interface CurrentLocation {
  address: string;
  lat: number;
  lon: number;
}
