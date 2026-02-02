# Levent Kolej – Kendi CMS’iniz

Next.js 16 + Payload CMS 3 ile kurulu, **içerik yönetimi** odaklı, production’a hazır site. **Vercel + Neon + Vercel Blob** ile deploy edilebilir.

## Özellikler

- **Sayfalar**: Blok tabanlı sayfa (Hero, Metin, Değerler, CTA, Form, **Haber Listesi**) – slug ile URL
- **Haberler**: Başlık, slug, özet, içerik, kapak görseli, kategori, yayın tarihi – `/haber`, `/haber/[slug]`
- **Medya**: Görsel/dosya – yerelde `public/uploads/media/`, **Vercel’de Vercel Blob**
- **Formlar**: Admin’de form tanımlayıp sayfalarda “Form” bloku ile kullanma
- **Header / Footer**: Globals ile üst menü ve alt bilgi
- **Admin**: `/admin` – Türkçe etiketler

Ana sayfa: slug’ı **anasayfa** olan sayfa. Diğer sayfalar: `/{slug}`. Haberler: `/haber`, `/haber/[slug]`.

## Kurulum (yerel)

```bash
cp .env.example .env
# .env: PAYLOAD_SECRET değiştirin; DATABASE_URL boş bırakırsanız SQLite kullanılır

npm install
npm run dev
```

Tarayıcıda: **http://localhost:3000** (site), **http://localhost:3000/admin** (yönetim). İlk açılışta `/admin`’de bir kullanıcı oluşturun.

---

## Production: Vercel + Neon + Vercel Blob

### 1. Neon (PostgreSQL)

1. [neon.tech](https://neon.tech) → hesap oluştur, yeni proje.
2. **Connection string** kopyala (örn. `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`).

### 2. Vercel Blob (dosya depolama)

1. [vercel.com](https://vercel.com) → projeyi bağla (Git push veya `vercel` CLI).
2. **Storage** → **Create Database** → **Blob**.
3. Blob store oluştur; Vercel otomatik olarak **`BLOB_READ_WRITE_TOKEN`** env değişkenini ekler.

### 3. Vercel ortam değişkenleri

Proje **Settings → Environment Variables** içinde:

| Değişken | Açıklama | Örnek |
|----------|----------|--------|
| `PAYLOAD_SECRET` | Güçlü rastgele string (zorunlu) | `openssl rand -base64 32` çıktısı |
| `DATABASE_URL` | Neon connection string (PostgreSQL) | `postgresql://...?sslmode=require` |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (Blob ekleyince otomatik) | — |

- **PAYLOAD_SECRET** yoksa uygulama güvenli çalışmaz; mutlaka ekleyin.
- **DATABASE_URL** `postgres` ile başlarsa Neon (PostgreSQL) kullanılır; yoksa yerelde SQLite kullanılır.
- **BLOB_READ_WRITE_TOKEN** varsa medya Vercel Blob’a yüklenir; yoksa yerelde `public/uploads/media/` kullanılır.

### 4. Deploy

```bash
git push origin main
# veya
vercel --prod
```

İlk deploy sonrası **https://proje-adin.vercel.app/admin** ile giriş yapıp kullanıcı oluşturun.

### Özet davranış

- **Yerel**: `DATABASE_URL` yok → SQLite (`file:./payload.db`). `BLOB_READ_WRITE_TOKEN` yok → dosyalar `public/uploads/media/`.
- **Vercel**: `DATABASE_URL` = Neon connection string → PostgreSQL. `BLOB_READ_WRITE_TOKEN` = Vercel’den → medya Vercel Blob’da.

---

## Proje yapısı

- `src/collections/` – Users, Media, Pages, Posts, Forms
- `src/globals/` – Header, Footer
- `src/components/` – Header, Footer, bloklar (Hero, CTA, Values, NewsList, Form, RichText)
- `src/app/` – `/`, `/[slug]`, `/haber`, `/haber/[slug]`, `(payload)/admin`, `(payload)/api`
- `public/uploads/` – Yerelde WP görselleri (YYYY/MM) + media/ (Payload)
- `public/theme/` – Eduvalt şekilleri

## Tasarım (Eduvalt)

- Renkler ve fontlar: `src/app/globals.css` (Hind, Lexend Deca, #1363DF, #082A5E).
- Eduvalt şekilleri: `public/theme/objects/`.

## Uploads

- **Yerel**: Eski WP görselleri `public/uploads/YYYY/MM/`; yeni yüklemeler `public/uploads/media/` (veya Blob token yoksa burada).
- **Vercel**: Medya **Vercel Blob**’da; URL’ler Blob CDN üzerinden sunulur.
- Yardımcı: `src/lib/uploads.ts` – `uploadsUrl()`, `wpStylePath()`.

### Görsel eşlemesi (leventokullari.com)

Referans sitedeki görseller `public/uploads/` içinde aynı yol ile duruyor. Kullanım yerleri:

| Yer | Uploads yolu | Not |
|-----|----------------|-----|
| **Hero (banner)** | `/uploads/2024/09/rana-banner-img-min.png` | Varsayılan; Hero blokta "Banner görseli" boşsa bu kullanılır. |
| **YKS başarı** (ana sayfa) | `/uploads/2026/01/WhatsApp-Image-2026-01-14-at-11.55.09.jpeg` | İsterseniz ayrı bir blokta kullanılabilir. |
| **Öğretmen fotoğrafları** (Kerem, Mustafa Kerem, Oğuzhan) | `2025/08/IMG_0988-Duzenlendi.jpg`, `354A8659-Duzenlendi.jpg`, `Adsiz-tasarim-1.jpg` | Kadro / başarı blokları için. |
| **Çalışma arkadaşları** (Burak, Kamer) | `2024/08/burak-hoca-web-yeni.png`, `2024/08/kamerhoca-e1724766207132.png` | İletişim / kadro sayfaları. |
| **Haber kapak** | Haber kaydında "Kapak görseli" (Media) | Post featured image. |

## Müşteri teslimi

Müşteriye sadece **/admin** ve giriş bilgisi verin. Menüde: Sayfalar, Haberler, Medya, Formlar, Üst Menü, Alt Bilgi.
