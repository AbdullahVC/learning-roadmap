import type { Units } from "../core/weather.types";

type Props = { units: Units; onToggle: () => void };

export default function UnitToggle({ units, onToggle }: Props) {
  const isMetric = units === "metric";
  return (
    <button
      onClick={onToggle}
      aria-label="toggle-units"
      title="Birim değiştir"
      style={{ marginLeft: 8 }}>
      {isMetric ? "°C / km/h" : "°F / mph"}
    </button>
  );
}
