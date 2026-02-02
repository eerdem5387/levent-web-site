# Payload migration (Postgres)

## Production’da tablolar yoksa (Sunucu hatası / Failed query)

Vercel’de **"Failed query"** veya **"header" tablosu bulunamadı** benzeri hata alıyorsanız, Neon’daki veritabanında tablolar henüz oluşturulmamıştır. En pratik yol: **şemayı push ile oluşturmak** (migration çalıştırmaya gerek yok):

```bash
# Neon production DATABASE_URL ile (Vercel’deki ile aynı)
PUSH_SCHEMA=1 DATABASE_URL="postgresql://..." npm run dev
```

Tarayıcıda **http://localhost:3000** açın; ilk istekte Payload Postgres’e tüm tabloları yazar. Sonra `Ctrl+C` ile dev’i durdurun. Artık Vercel’deki site de aynı DB’yi kullandığı için çalışır.

(Not: Mevcut migration dosyası SQLite için üretildiği ve CLI’de ESM/require uyumsuzluğu olduğu için `npm run migrate` yerine push yöntemi kullanıyoruz.)

## Migration oluşturma (yeni şema değişikliği için)

Yerelde yeni migration dosyası oluşturmak için:

```bash
# .env veya ortamda DATABASE_URL (Postgres) tanımlı olsun
npm run migrate:create -- --force-accept-warning
```

Script otomatik olarak `PAYLOAD_MIGRATING=true` ve `NODE_OPTIONS='--import tsx/esm'` kullanır.

## Vercel ortam değişkenleri

1. **DATABASE_URL** – Neon Postgres bağlantı URL’i  
2. **PAYLOAD_SECRET** – Gizli anahtar  
3. **BLOB_READ_WRITE_TOKEN** – (Medya için) Vercel Blob token  

Migration’ı yukarıdaki gibi bir kez çalıştırdıktan sonra deploy’lar normal şekilde çalışır.
