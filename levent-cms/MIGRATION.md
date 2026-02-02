# Payload migration (Postgres)

## Migration oluşturma

Yerelde migration oluşturmak için:

```bash
# .env veya ortamda DATABASE_URL (Postgres) tanımlı olsun
npm run migrate:create -- --force-accept-warning
```

Script otomatik olarak `PAYLOAD_MIGRATING=true` ve `NODE_OPTIONS='--import tsx/esm'` kullanır; migration sırasında lexical/Pages/Posts yerine minimal şema kullanılır (require + ESM uyumu için).

## Vercel’de şema

Projede Vercel için **`push: true`** açık; ilk istekte Payload şemayı veritabanında oluşturur. Yani:

1. **DATABASE_URL**, **PAYLOAD_SECRET**, **BLOB_READ_WRITE_TOKEN** Vercel ortam değişkenlerinde tanımlı olsun.
2. Deploy’dan sonra site veya admin’e bir istek atın; tablolar otomatik oluşur.
3. İsterseniz build’e `npm run migrate && next build` ekleyerek oluşan migration’ları da çalıştırabilirsiniz.
