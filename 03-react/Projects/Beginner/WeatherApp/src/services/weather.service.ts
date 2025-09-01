// src/services/weather.service.ts
import type { Units, WeatherBundle } from "../core/weather.types";

// Basit cache: 10 dk'lık kovalar
const CACHE = new Map<string, WeatherBundle>();
const TEN_MIN = 10 * 60 * 1000;

function bucket10m(ts = Date.now()) {
  return Math.floor(ts / TEN_MIN) * TEN_MIN;
}

function unitsParams(units: Units) {
  return units === "metric"
    ? { temperature_unit: "celsius", wind_speed_unit: "kmh" }
    : { temperature_unit: "fahrenheit", wind_speed_unit: "mph" };
}

// Çok küçük bir weathercode -> ikon eşlemesi
function codeToIcon(code: number): string {
  if ([0].includes(code)) return "clear-day"; // Clear
  if ([1, 2].includes(code)) return "partly-cloudy";
  if ([3].includes(code)) return "cloudy";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "rain";
  if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([80, 81, 82].includes(code)) return "showers";
  if ([95, 96, 99].includes(code)) return "thunderstorm";
  return "unknown";
}

/**
 * Open-Meteo forecast API (anahtar gerekmez)
 * https://api.open-meteo.com/v1/forecast
 */
export async function getWeather(
  lat: number,
  lon: number,
  units: Units,
  signal?: AbortSignal
): Promise<WeatherBundle> {
  const key = `${lat.toFixed(2)}|${lon.toFixed(2)}|${units}|${bucket10m()}`;
  const hit = CACHE.get(key);
  if (hit) return hit;

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("timezone", "auto");
  url.searchParams.set(
    "current",
    "temperature_2m,apparent_temperature,weathercode,wind_speed_10m,relative_humidity_2m,pressure_msl"
  );
  url.searchParams.set("hourly", "temperature_2m,weathercode,precipitation_probability");
  url.searchParams.set("daily", "temperature_2m_max,temperature_2m_min,weathercode");
  const u = unitsParams(units);
  url.searchParams.set("temperature_unit", u.temperature_unit);
  url.searchParams.set("wind_speed_unit", u.wind_speed_unit);

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Hava verisi alınamadı (HTTP ${res.status})`);
  const data = await res.json();

  // ---- Adaptör: Open-Meteo -> WeatherBundle
  const current = {
    temp: data.current?.temperature_2m ?? 0,
    feelsLike: data.current?.apparent_temperature ?? data.current?.temperature_2m ?? 0,
    desc: "", // Open-Meteo text açıklama vermez, ikonla temsil edeceğiz
    icon: codeToIcon(data.current?.weathercode ?? 0),
    windKph: units === "metric" ? data.current?.wind_speed_10m ?? 0 : undefined,
    windMph: units === "imperial" ? data.current?.wind_speed_10m ?? 0 : undefined,
    humidity: data.current?.relative_humidity_2m ?? 0,
    pressure: data.current?.pressure_msl ?? 0,
    time: data.current?.time ?? new Date().toISOString(),
  };

  const hourly = (data.hourly?.time ?? []).map((t: string, i: number) => ({
    time: t,
    temp: data.hourly.temperature_2m?.[i] ?? 0,
    icon: codeToIcon(data.hourly.weathercode?.[i] ?? 0),
    precipProb: (data.hourly.precipitation_probability?.[i] ?? undefined) as number | undefined,
  }));

  const daily = (data.daily?.time ?? []).map((d: string, i: number) => ({
    date: d,
    min: data.daily.temperature_2m_min?.[i] ?? 0,
    max: data.daily.temperature_2m_max?.[i] ?? 0,
    icon: codeToIcon(data.daily.weathercode?.[i] ?? 0),
  }));

  const bundle: WeatherBundle = { current, hourly, daily };
  CACHE.set(key, bundle);
  return bundle;
}
