export interface WeatherData {
  location: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface HourlyWeather {
  time: string;
  date: string;
  temp: number;
  icon: string;
}

export interface WeatherResponse {
  current: WeatherData;
  hourly: HourlyWeather[];
}

export interface OpenWeatherCurrentResponse {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: Array<{
      icon: string;
    }>;
  }>;
}
