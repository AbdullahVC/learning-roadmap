// src/components/ForecastList.tsx
import type { HourlyPoint, DailyPoint, Units } from "../core/weather.types";
import { formatTemp, next24h } from "../core/weather.selectors";

type Props = {
  hourly: HourlyPoint[];
  daily: DailyPoint[];
  mode: "24h" | "7d";
  units: Units;
};

export default function ForecastList({ hourly, daily, mode, units }: Props) {
  const is24h = mode === "24h";

  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: "1rem",
        marginTop: "1rem",
      }}>
      <h3 style={{ marginTop: 0 }}>{is24h ? "24 Saatlik Tahmin" : "7 Günlük Tahmin"}</h3>

      {is24h ? (
        <ul style={{ paddingLeft: "1.2rem" }}>
          {next24h(hourly).map((h) => (
            <li key={h.time}>
              {new Date(h.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              — {formatTemp(h.temp, units)} ({h.icon})
            </li>
          ))}
        </ul>
      ) : (
        <ul style={{ paddingLeft: "1.2rem" }}>
          {daily.map((d) => (
            <li key={d.date}>
              {new Date(d.date).toLocaleDateString([], { weekday: "short" })} — min{" "}
              {formatTemp(d.min, units)} / max {formatTemp(d.max, units)} ({d.icon})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
