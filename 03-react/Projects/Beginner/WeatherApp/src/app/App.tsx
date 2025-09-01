// src/app/App.tsx
import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import UnitToggle from "../components/UnitToggle";
import CurrentCard from "../components/CurrentCard";
import ForecastList from "../components/ForecastList";
import ErrorBanner from "../components/ErrorBanner";
import LoadingIndicator from "../components/LoadingIndicator";

import type { GeoCity, QueryState, Units, WeatherBundle } from "../core/weather.types";
import { initialQuery, setCity, toggleUnits } from "../core/weather.store";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { formatTemp } from "../core/weather.selectors";

import { searchCity } from "../services/geocoding.service";
import { getWeather } from "../services/weather.service";

export default function App() {
  // ---------------- UI state
  const [term, setTerm] = useState(""); // input değeri
  const debounced = useDebouncedValue(term, 350); // aramayı beklet
  const [query, setQuery] = useState<QueryState>(initialQuery); // seçili şehir + units
  const [suggestions, setSuggestions] = useState<GeoCity[]>([]);
  const [bundle, setBundle] = useState<WeatherBundle | undefined>(undefined);
  const [mode, setMode] = useState<"24h" | "7d">("24h");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // ---------------- Derived info (geliştirici dostu)
  const cityLabel = useMemo(() => {
    return query.city ? `${query.city.name}, ${query.city.country}` : "Şehir seçilmedi";
  }, [query.city]);

  // ---------------- Handlers

  // 1) Input değiştikçe tetiklenir (SearchBar -> onChange)
  function handleChangeInput(val: string) {
    setTerm(val);
    // Kullanıcı yazarken city'yi temizlemek isteyebilirsin (opsiyonel):
    // setQuery(prev => clearCity(prev));
    // Öneri listesi de temiz kalabilir:
    if (val.length < 2) setSuggestions([]);
  }

  // 2) Önerilerden şehir seçildiğinde
  function handlePickCity(city: GeoCity) {
    setQuery((prev) => setCity(prev, city));
    setTerm(`${city.name}`); // input'a şehir adını yaz
    setSuggestions([]); // önerileri kapat
    setError(undefined);
    // NOT: gerçek hava verisini STEP 9'da çekeceğiz.
  }

  // 3) Birimleri değiştir
  function handleToggleUnits() {
    setQuery((prev) => toggleUnits(prev));
    // NOT: aynı şehir için tekrar hava verisi istenmesini STEP 9'da yapacağız.
  }

  // 4) 24h / 7d modu değiştir
  function handleMode(newMode: "24h" | "7d") {
    setMode(newMode);
  }

  // ---------------- Effects (yalnızca iskelet, gerçek istek yok)

  useEffect(() => {
    const ac = new AbortController();

    async function run() {
      try {
        setError(undefined);
        if (debounced.trim().length < 2) {
          setSuggestions([]);
          return;
        }
        setLoading(true);
        const list = await searchCity(debounced, ac.signal);
        setSuggestions(list);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setSuggestions([]);
        setError("Şehir ararken bir sorun oluştu.");
      } finally {
        setLoading(false);
      }
    }

    run();
    return () => ac.abort();
  }, [debounced]);

  // B) Seçili şehir veya units değiştiğinde hava verisini çek (STEP 9'da gerçek servis)
  useEffect(() => {
    if (!query.city) {
      setBundle(undefined);
      return;
    }
    const ac = new AbortController();
    (async () => {
      try {
        setError(undefined);
        setLoading(true);
        const b = await getWeather(query.city!.lat, query.city!.lon, query.units, ac.signal);
        setBundle(b);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name !== "AbortError") {
          setBundle(undefined);
          setError("Hava durumu alınamadı. İnternet bağlantını kontrol et.");
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [query.city, query.units]);

  // ---------------- Render
  return (
    <main style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1 style={{ margin: 0, flex: 1 }}>🌤️ Weather App</h1>
        <UnitToggle units={query.units as Units} onToggle={handleToggleUnits} />
      </header>

      <section style={{ marginTop: 12 }}>
        <SearchBar
          value={term}
          onChange={handleChangeInput}
          suggestions={suggestions}
          onPick={handlePickCity}
          loading={loading}
          error={error}
        />
      </section>

      {loading && <LoadingIndicator />}
      {error && (
        <ErrorBanner
          message={error}
          onRetry={() => {
            // STEP 9'da getWeather/searchCity tekrar denemeyi burada çağıracağız
            setError(undefined);
          }}
        />
      )}

      {bundle && query.city && (
        <>
          <CurrentCard current={bundle.current} city={query.city} units={query.units} />

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button onClick={() => handleMode("24h")} aria-pressed={mode === "24h"}>
              24 Saat
            </button>
            <button onClick={() => handleMode("7d")} aria-pressed={mode === "7d"}>
              7 Gün
            </button>
          </div>

          <ForecastList
            hourly={bundle.hourly}
            daily={bundle.daily}
            mode={mode}
            units={query.units}
          />
        </>
      )}

      {!bundle && (
        <p style={{ marginTop: 16, opacity: 0.7 }}>
          Bir şehir arayın ve seçin. Örnek: <b>Ankara</b>, <b>İstanbul</b>
          <br />
          (Şu an demo verisi gösteriliyor; gerçek API’yi STEP 8–9’da bağlayacağız.)
        </p>
      )}

      <footer style={{ marginTop: 24, opacity: 0.6, fontSize: 12 }}>
        Durum: {cityLabel} — Birim: {query.units.toUpperCase()} — Örnek:{" "}
        {formatTemp(21, query.units)}
      </footer>
    </main>
  );
}
