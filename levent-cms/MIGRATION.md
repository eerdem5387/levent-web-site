# Payload migration (Postgres)

## Durum

- `payload migrate:create` komutu TypeScript config ve ESM/require sınırları yüzünden bazı ortamlarda hata verebiliyor:
  - **NODE_OPTIONS yok:** `Cannot find module '.../Users'` (Node, `.ts` dosyalarını çözemiyor).
  - **NODE_OPTIONS='--import tsx/esm':** `require() cannot be used on ESM graph with top-level await` (tsx/config zinciri require kullanıyor).

## Önerilen yol: Vercel’de `push`

Projede Vercel için **`push: true`** açık; ilk istekte Payload şemayı veritabanında oluşturur. Yani:

1. **DATABASE_URL**, **PAYLOAD_SECRET**, **BLOB_READ_WRITE_TOKEN** Vercel ortam değişkenlerinde tanımlı olsun.
2. Deploy’dan sonra site veya admin’e bir istek atın; tablolar otomatik oluşur.
3. Migration dosyası üretmeden çalışabilirsiniz.

İleride migration kullanmak isterseniz Payload/Node tarafındaki ESM/require düzeltmelerini bekleyebilir veya config’i önce JS’e derleyip o çıktıyı kullanabilirsiniz.

## Yerelde migration denemek

Yerelde migration oluşturmak isterseniz:

```bash
# .env veya ortamda DATABASE_URL (Postgres) tanımlı olsun
npm run migrate:create -- --force-accept-warning
```

`NODE_OPTIONS='--import tsx/esm'` script içinde tanımlı; yine de require/ESM hatası alırsanız yukarıdaki **push** yöntemini kullanın.
