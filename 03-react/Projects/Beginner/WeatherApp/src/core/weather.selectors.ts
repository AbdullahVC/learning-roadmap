import type { Units, HourlyPoint } from "./weather.types";

export function formatTemp(value: number, units: Units): string {
  const rounded = Math.round(value);
  return units === "metric" ? `${rounded}°C` : `${rounded}°F`;
}

export function formatWind(value: number, units: Units): string {
  const rounded = Math.round(value);
  return units === "metric" ? `${rounded} km/h` : `${rounded} mph`;
}

export function groupHourlyByDay(hourly: HourlyPoint[]): Record<string, HourlyPoint[]> {
  // TODO: gerçek implementasyon sonra
  return {};
}

export function next24h(hourly: HourlyPoint[]): HourlyPoint[] {
  // TODO: gerçek implementasyon sonra
  return [];
}

export function pickIcon(codeOrDesc: string): string {
  // TODO: gerçek implementasyon sonra
  return "clear-day";
}
