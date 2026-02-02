# Payload migration (Postgres)

## Production’da tablolar yoksa (Sunucu hatası / Failed query)

Vercel’de **"Failed query"** veya **"header" tablosu bulunamadı** benzeri hata alıyorsanız, Neon’daki veritabanında tablolar henüz oluşturulmamıştır. Migration’ı **bir kez** production DB’ye uygulayın:

```bash
# Neon’daki production DATABASE_URL’i kullanın (Vercel env’deki ile aynı)
DATABASE_URL="postgresql://..." npm run migrate:run
```

Bu komut `src/migrations/` altındaki migration’ları çalıştırır ve `header`, `header_nav_links`, `pages`, `posts` vb. tabloları oluşturur. Sonrasında site çalışır.

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
