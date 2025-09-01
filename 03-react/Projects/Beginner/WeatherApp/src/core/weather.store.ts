import type { QueryState, GeoCity } from "./weather.types";

export function setCity(state: QueryState, city: GeoCity): QueryState {
  return { ...state, city };
}

export function toggleUnits(state: QueryState): QueryState {
  const next = state.units === "metric" ? "imperial" : "metric";
  return { ...state, units: next };
}

export function clearCity(state: QueryState): QueryState {
  return { ...state, city: undefined };
}

export const initialQuery: QueryState = { units: "metric" };
