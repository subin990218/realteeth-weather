import axios from 'axios';

export const weatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    units: 'metric',
    lang: 'kr',
  },
});

export const geocodingClient = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0',
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
  },
});
