# İç Sayfalar Kurulumu (leventokullari.com ile birebir)

Admin panelinden aşağıdaki sayfaları oluşturun. **Slug** değerini aynen yazın; böylece URL’ler referans site ile aynı olur.

## Sayfa listesi

| Sayfa başlığı | Slug | Bloklar / not |
|---------------|------|----------------|
| **Kadromuz** | `top-class-instructors` | Hero (başlık: Kadromuz) + **Kadro Listesi** |
| **Öğrencilerimiz** | `about-us/ogrencilerimiz` | Hero + **Öğrenci Listesi** (maddeleri siteden kopyalayın) |
| **İletişim** | `contact` | Hero (Bizimle İletişime Geç) + **İletişim** (adres, telefon, e-posta) |
| **Çalışma Arkadaşları Arıyoruz!** | `calisma-arkadaslari-ariyoruz` | Hero + Metin + **Form** (iş başvuru formu) |
| **Etkinliklerimiz** | `all-events` | Hero + **Haber Listesi** (veya `/haber` yönlendirmesi) |
| **Hakkımızda** | `about-us` | Hero + Metin + Değerler + CTA + isterseniz Kadro / Öğrenci linkleri |
| **Gizlilik ve Güvenlik Politikası** | `gizlilik-ve-guvenlik-politikasi` | Hero + **Metin** (yasal metin) |
| **İptal ve İade Politikası** | `iptal-ve-iade-politikasi` | Hero + **Metin** (yasal metin) |
| **Mesafeli Satış Sözleşmesi** | `mesafeli-satis-sozlesmesi` | Hero + **Metin** (yasal metin) |

## Kadromuz (top-class-instructors)

1. **Sayfalar** → Yeni → Başlık: **Kadromuz**, Slug: **top-class-instructors**
2. Hero blok: Alt başlık boş, Ana başlık: **Kadromuz**
3. **Kadro Listesi** bloku ekleyin (başlık: Kadromuz veya boş)
4. **Kadro** koleksiyonundan tüm öğretmenleri ekleyin:
   - Ad Soyad, Ünvan, Branş (Rehberlik, Matematik, Fen, …), Fotoğraf (opsiyonel; boşsa `uploads/2025/08` ile eşleşen varsayılan kullanılır), Sıra

Referans sitedeki isim/ünvan listesi: [Kadromuz – leventokullari.com](https://leventokullari.com/top-class-instructors/). Görseller `public/uploads/2025/08` ve `public/uploads/2024/03` içinde isim eşleşmesiyle kullanılır (örn. Beyza Demirci → `beyza-demirci-350x350.jpg`).

## Öğrencilerimiz (about-us/ogrencilerimiz)

- Slug: **about-us/ogrencilerimiz** (tire ile, tek alan)
- **Öğrenci Listesi** blokunda her öğe: Ad Soyad, Üniversite, Bölüm/Program  
- Liste: [Öğrencilerimiz – leventokullari.com](https://leventokullari.com/about-us/ogrencilerimiz/)

## İletişim (contact)

- **İletişim** bloku:  
  Adres: **Rize Levent Koleji Fabrika Sokak Hayrat, 53020 Rize Merkez/Rize**  
  Telefon: **(0464) 217 15 55**  
  E-posta: **info@leventokullari.com**

## Çalışma Arkadaşları Arıyoruz (calisma-arkadaslari-ariyoruz)

- Metin blokunda sitedeki açıklama metnini kopyalayın
- **Form** blokunda İş Başvuru formunu seçin (Forms’tan oluşturup alanları sitedekine göre ayarlayın)

## Etkinliklerimiz (all-events)

- **Haber Listesi** bloku ekleyin (başlık: Etkinliklerimiz, açıklama sitedeki gibi)
- Haberler zaten **Haberler** koleksiyonunda; bu sayfa ile `/haber` aynı kaynağı kullanır

## Hakkımızda (about-us)

- Hero + Metin (Levent College Concept tanıtımı) + Değerler + CTA
- İsterseniz “Öğrencilerimiz” / “Kadromuz” linkli butonlar için CTA bloklarını kullanın

## Yasal sayfalar (gizlilik, iptal/iade, mesafeli satış)

- Her biri için bir sayfa: Hero (sayfa başlığı) + **Metin** blokunda ilgili yasal metni yapıştırın
- Metinler: [Gizlilik](https://leventokullari.com/gizlilik-ve-guvenlik-politikasi/), [İptal/İade](https://leventokullari.com/iptal-ve-iade-politikasi/), [Mesafeli Satış](https://leventokullari.com/mesafeli-satis-sozlesmesi/)

## Header menü linkleri

**Üst Menü** global’ında aşağıdaki linkleri ekleyin (label + url):

- Kadromuz → `/top-class-instructors`
- Hakkımızda → `/about-us`
- Öğrencilerimiz → `/about-us/ogrencilerimiz`
- Etkinliklerimiz → `/all-events` (veya `/haber`)
- İletişim → `/contact`
- Çalışma Arkadaşları Arıyoruz → `/calisma-arkadaslari-ariyoruz`
- Gizlilik ve Güvenlik Politikası → `/gizlilik-ve-guvenlik-politikasi`
- İptal ve İade Politikası → `/iptal-ve-iade-politikasi`
- Mesafeli Satış Sözleşmesi → `/mesafeli-satis-sozlesmesi`

## Görseller ve ikonlar

- **Hero / banner**: Varsayılan `uploads/2024/09/rana-banner-img-min.png` (Hero’da “Banner görseli” boşsa)
- **Kadro fotoğrafları**: `uploads/2025/08` ve `uploads/2024/03`; isim → dosya adı eşlemesi `src/lib/instructorImages.ts` içinde. Medya seçilmezse bu path’ler kullanılır.
- **Çalışma arkadaşları** (Burak, Kamer): `uploads/2024/08/burak-hoca-web-yeni.png`, `uploads/2024/08/kamerhoca-e1724766207132.png` (isterseniz Hakkımızda veya iletişim bloklarında kullanılabilir)
- Tema şekilleri (dekoratif SVG): `public/theme/objects/` (Hero, CTA vb. bloklarda kullanılıyor)

Sayfaları oluşturduktan sonra menü linkleri ile tüm iç sayfalar leventokullari.com ile aynı URL ve yapıda çalışır.
