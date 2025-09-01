// src/components/SearchBar.tsx
import type { GeoCity } from "../core/weather.types";

type Props = {
  value: string; // input'taki metin
  onChange: (val: string) => void; // kullanıcı yazdıkça tetiklenecek
  suggestions: GeoCity[]; // öneri listesi (parent'tan gelir)
  onPick: (city: GeoCity) => void; // kullanıcı bir öneriye tıklayınca
  loading: boolean; // arama sırasında true
  error?: string; // hata mesajı (opsiyonel)
};

export default function SearchBar({ value, onChange, suggestions, onPick, loading, error }: Props) {
  return (
    <div style={{ position: "relative" }}>
      {/* 1) KONTROLLÜ INPUT — value dışarıdan gelir, değişikliği dışarıya bildirir */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Şehir ara (ör. Ankara)"
        aria-label="search-city"
        style={{ width: "100%", padding: "0.6rem 0.8rem" }}
      />

      {/* 2) DURUM METİNLERİ */}
      {loading && <div style={{ marginTop: 6, fontSize: 12 }}>Loading…</div>}
      {error && <div style={{ marginTop: 6, fontSize: 12, color: "crimson" }}>Error: {error}</div>}

      {/* 3) ÖNERİ LİSTESİ — varsa göster, yoksa hiç render etme */}
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            zIndex: 10,
            left: 0,
            right: 0,
            top: "calc(100% + 6px)",
            margin: 0,
            padding: 0,
            listStyle: "none",
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fff",
            maxHeight: 260,
            overflowY: "auto",
          }}
          role="listbox"
          aria-label="suggestions">
          {suggestions.map((c) => (
            <li
              key={c.id}
              onClick={() => onPick(c)}
              role="option"
              aria-selected="false"
              style={{
                padding: "8px 10px",
                borderBottom: "1px solid #f2f2f2",
                cursor: "pointer",
              }}
              onMouseDown={(e) => e.preventDefault()}
              // (input fokusunu kaybetmesin diye)
            >
              {c.name}, {c.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
