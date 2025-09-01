// src/services/geocoding.service.ts
import type { GeoCity } from "../core/weather.types";

const CACHE = new Map<string, GeoCity[]>();

/**
 * Open-Meteo Geocoding:
 *  https://geocoding-api.open-meteo.com/v1/search?name=ankara&count=5&language=tr&format=json
 */
export async function searchCity(term: string, signal?: AbortSignal): Promise<GeoCity[]> {
  const q = term.trim();
  if (q.length < 2) return [];

  // 1) Cache
  const hit = CACHE.get(q.toLowerCase());
  if (hit) return hit;

  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", q);
  url.searchParams.set("count", "8");
  url.searchParams.set("language", "tr");
  url.searchParams.set("format", "json");

  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Arama başarısız (HTTP ${res.status})`);

  const data = (await res.json()) as {
    results?: Array<{
      id?: number;
      name: string;
      country?: string;
      latitude: number;
      longitude: number;
    }>;
  };

  const results = (data.results ?? []).map((r) => ({
    id: String(r.id ?? `${r.name}-${r.latitude}-${r.longitude}`),
    name: r.name,
    country: r.country ?? "",
    lat: r.latitude,
    lon: r.longitude,
  })) satisfies GeoCity[];

  CACHE.set(q.toLowerCase(), results);
  return results;
}
