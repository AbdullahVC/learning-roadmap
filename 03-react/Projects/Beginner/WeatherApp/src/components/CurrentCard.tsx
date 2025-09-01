import type { CurrentWeather, GeoCity, Units } from "../core/weather.types";
import { formatTemp, formatWind } from "../core/weather.selectors";

type Props = {
  current: CurrentWeather;
  city: GeoCity;
  units: Units;
};

export default function CurrentCard({ current, city, units }: Props) {
  return (
    <section
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: "1rem",
        marginTop: "1rem",
      }}>
      <h2 style={{ margin: 0 }}>
        {city.name}, {city.country}
      </h2>
      <p style={{ fontSize: "2rem", margin: "0.5rem 0" }}>{formatTemp(current.temp, units)}</p>
      <p style={{ margin: 0 }}>{current.desc}</p>
      <ul style={{ paddingLeft: "1.2rem", marginTop: ".5rem" }}>
        <li>Hissedilen: {formatTemp(current.feelsLike, units)}</li>
        <li>Rüzgâr: {formatWind(current.windKph ?? current.windMph ?? 0, units)}</li>
        <li>Nem: {current.humidity}%</li>
        <li>Basınç: {current.pressure} hPa</li>
      </ul>
    </section>
  );
}
