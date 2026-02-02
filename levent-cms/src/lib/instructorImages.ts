/**
 * leventokullari.com Kadromuz sayfasındaki isimlere göre uploads/2025/08 dosya adı.
 * Medya seçilmezse bu path kullanılır (Next.js public/uploads üzerinden).
 */
function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/** Ad soyad → uploads dosya adı (uzantısız). Bazı isimler sitedeki dosya adıyla birebir. */
const NAME_TO_FILE: Record<string, string> = {
  'tuğba çelik': 'IMG_0933',
  'beyza demirci': 'beyza-demirci',
  'yasemin demir': 'yasemin-demir',
  'rabia akbulut': 'rabia-akbulut',
  'nurşin yılmaz': 'nursin-yilmaz',
  'esra akyıldız': 'esra-akyildiz',
  'kadir koçoğlu': 'kadir-kocoglu',
  'rümeysa baraner': 'aker', // 2024/08 akercopy veya placeholder
  'dilara bilaloğlu': 'dilara-bilaloglu',
  'gülben seymenoğlu': 'gulben-seymenoglu',
  'edanur kadir': 'edanur-kadir',
  'göksu deringöl': 'goksu-deringol',
  'beyzanur örün': 'beyzanur-orun',
  'sarra ece akgül': 'serra-akgul',
  'serra akgül': 'serra-akgul',
  'ceyda şenkal': 'ceyda-senkal',
  'sıla tok': 'sila-tok',
  'gülşah güngör': 'gulsah-gungor',
  'eda göz': 'eda-goz',
  'merve muratdağı': 'merve-muratdagi',
  'ali uluçay': 'ali-yavuz-sandikci', // placeholder
  'sümeyra kasap': 'sumeyra-kasap',
  'kardelen bayraktar': 'kardelen-bayraktar',
  'ilknur kanberoğlu': 'ilknur-kanberoglu',
  'abdullah yılmaz': 'abdullah-yilmaz',
  'ali yavuz sandıkçı': 'ali-yavuz-sandikci',
  'mehtap karaca': 'mehtap-karaca',
  'kamer karali': 'kamer-karali',
  'büşra mete': 'busra-mete',
  'bahar elitaş': 'bahar-akgul', // placeholder
  'mürselin çelik': 'murselin-celik',
  'burak berber': 'burak-berber',
  'cem istafiloğlu': 'aker', // placeholder
  'arda çağlayan': 'aker',
  'mümin demirci': 'mumin-demirci',
}

const UPLOADS_2025 = '/uploads/2025/08'
const UPLOADS_2024_03 = '/uploads/2024/03'
const FALLBACK_SIZE = '350x350'

/** 2024/03 klasöründeki görseller (örn. Tuğba Çelik) */
const NAME_TO_BASE: Record<string, string> = {
  'tuğba çelik': UPLOADS_2024_03,
}

export function getInstructorImageUrl(
  name: string,
  mediaUrl?: string | null,
): string {
  if (mediaUrl) return mediaUrl
  const key = name.toLowerCase().trim()
  const file = NAME_TO_FILE[key] ?? normalize(name)
  const base = NAME_TO_BASE[key] ?? UPLOADS_2025
  return `${base}/${file}-${FALLBACK_SIZE}.jpg`
}
