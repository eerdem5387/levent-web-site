/**
 * WordPress benzeri upload URL yapısı: /uploads/YYYY/MM/dosya-adı
 * - Payload'tan gelen media: url zaten tam path içerebilir
 * - Eski WP referansları: /uploads/2024/09/... formatında kullanılabilir
 */
const UPLOADS_BASE = '/uploads'

export function uploadsUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('/')) return path
  return `${UPLOADS_BASE}/${path}`
}

/** Yıl/ay klasörü ile WordPress tarzı path (Payload hook ile kullanılabilir) */
export function wpStylePath(filename: string): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return `${y}/${m}/${filename}`
}
