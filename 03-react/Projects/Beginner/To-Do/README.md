# ✅ To-Do App (React + TypeScript)

Basit ama güçlü bir **To-Do uygulaması**. Kullanıcılar görev ekleyebilir, düzenleyebilir, tamamlandı işaretleyebilir, silebilir ve filtreleyebilir. Veriler **localStorage** ile kalıcıdır.

## 🚀 Özellikler

- Görev ekleme / düzenleme / silme
- Görevleri tamamlandı olarak işaretleme
- Filtreleme: **All / Active / Completed**
- Tamamlanan görevleri topluca temizleme
- LocalStorage ile veri kaybı olmadan kalıcılık
- Klavye kısayolları:

  - `Enter` → yeni görev ekle / düzenlemeyi kaydet
  - `Esc` → düzenlemeyi iptal et

- Basit ve erişilebilir arayüz (ARIA etiketleri)

## 🛠️ Teknolojiler

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- \[CSS (basic custom styles)]

## 📂 Klasör Yapısı

```
src/
 ├── components/   # TodoForm, TodoItem, TodoList, FilterBar
 ├── hooks/        # useLocalStorage
 ├── types/        # Tip tanımları (Todo, Filter)
 ├── App.tsx
 └── main.tsx
```

## ⚡ Kurulum

```bash
# Projeyi klonla
git clone <repo-url>
cd To-Do

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu çalıştır
npm run dev
```

## ✅ Test Senaryoları

- [ ] Yeni görev ekle → listede görünmeli
- [ ] Görev düzenle → yeni başlıkla kaydedilmeli
- [ ] Checkbox işaretle → görev tamamlandı görünmeli
- [ ] Filtreler → doğru görevleri göstermeli
- [ ] Sayfayı yenile → görevler kaybolmamalı

## 🌐 Canlı Demo

👉 [Netlify / Vercel Linki Buraya](https://example.com)

## 📌 Gelecek Geliştirmeler

- [ ] “Tümünü tamamla” seçeneği
- [ ] JSON export/import
- [ ] Tema (Dark/Light)
- [ ] URL parametreleri ile filtre senkronizasyonu
