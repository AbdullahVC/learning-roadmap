export interface GeoCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export type Units = "metric" | "imperial";

export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  desc: string;
  icon: string;
  windKph?: number;
  windMph?: number;
  humidity: number;
  pressure: number;
  time: string;
}

export interface HourlyPoint {
  time: string;
  temp: number;
  icon: string;
  precipProb?: number;
}

export interface DailyPoint {
  date: string;
  min: number;
  max: number;
  icon: string;
}

export interface WeatherBundle {
  current: CurrentWeather;
  hourly: HourlyPoint[];
  daily: DailyPoint[];
}

export interface QueryState {
  city?: GeoCity;
  units: Units;
}
