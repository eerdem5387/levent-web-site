import type { CollectionConfig } from 'payload'

/**
 * Yeni yüklemeler public/uploads/media/ altına gider, URL: /uploads/media/dosya-adı
 * Eski WP görselleri public/uploads/YYYY/MM/ altında (kopyalandı), URL: /uploads/YYYY/MM/dosya-adı
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Görseller ve dosyalar',
  },
  labels: {
    singular: 'Medya',
    plural: 'Medya',
  },
  upload: {
    staticDir: 'public/uploads/media',
    // Dosyalar /uploads/media/... olarak sunulur (Next.js public/ kökünden)
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Açıklama (alt metni)',
    },
  ],
}
