import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Site sayfaları. İçerik blokları ile sayfa oluşturun.',
  },
  labels: {
    singular: 'Sayfa',
    plural: 'Sayfalar',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Sayfa Başlığı',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL (slug)',
      admin: {
        description: 'Örn: hakkimizda, iletisim',
      },
    },
    {
      type: 'blocks',
      name: 'layout',
      label: 'Sayfa İçeriği',
      blocks: [
        {
          slug: 'hero',
          labels: { singular: 'Hero', plural: 'Hero Bölümleri' },
          fields: [
            { type: 'text', name: 'heading', label: 'Ana Başlık' },
            { type: 'textarea', name: 'subheading', label: 'Alt Başlık' },
            { type: 'text', name: 'ctaText', label: 'Buton Metni' },
            { type: 'text', name: 'ctaLink', label: 'Buton Linki' },
            {
              type: 'upload',
              name: 'image',
              relationTo: 'media',
              label: 'Banner görseli (sağ taraf)',
              admin: { description: 'Boş bırakılırsa varsayılan banner kullanılır.' },
            },
          ],
        },
        {
          slug: 'richText',
          labels: { singular: 'Metin', plural: 'Metin Bölümleri' },
          fields: [
            {
              type: 'richText',
              name: 'content',
              label: 'İçerik',
              editor: lexicalEditor(),
            },
          ],
        },
        {
          slug: 'values',
          labels: { singular: 'Değerler', plural: 'Değerler Listesi' },
          fields: [
            { type: 'text', name: 'heading', label: 'Bölüm Başlığı' },
            {
              type: 'array',
              name: 'items',
              label: 'Maddeler',
              fields: [
                { type: 'text', name: 'title', label: 'Başlık' },
                { type: 'textarea', name: 'description', label: 'Açıklama' },
              ],
            },
          ],
        },
        {
          slug: 'cta',
          labels: { singular: 'Çağrı', plural: 'Çağrı Bölümleri' },
          fields: [
            { type: 'text', name: 'heading', label: 'Başlık' },
            { type: 'textarea', name: 'description', label: 'Açıklama' },
            { type: 'text', name: 'buttonText', label: 'Buton Metni' },
            { type: 'text', name: 'buttonLink', label: 'Buton Linki' },
          ],
        },
        {
          slug: 'formBlock',
          labels: { singular: 'Form', plural: 'Form Bölümleri' },
          fields: [
            {
              type: 'relationship',
              name: 'form',
              relationTo: 'forms',
              required: true,
              label: 'Form',
            },
          ],
        },
        {
          slug: 'newsList',
          labels: { singular: 'Haber Listesi', plural: 'Haber Listesi Bölümleri' },
          fields: [
            { type: 'text', name: 'heading', label: 'Bölüm Başlığı' },
            { type: 'textarea', name: 'description', label: 'Açıklama' },
            {
              type: 'number',
              name: 'limit',
              label: 'Kaç haber gösterilsin',
              defaultValue: 6,
              admin: { description: 'Varsayılan: 6' },
            },
          ],
        },
        {
          slug: 'instructorsGrid',
          labels: { singular: 'Kadro Listesi', plural: 'Kadro Listesi' },
          fields: [
            { type: 'text', name: 'heading', label: 'Bölüm Başlığı', defaultValue: 'Kadromuz' },
          ],
        },
        {
          slug: 'studentsList',
          labels: { singular: 'Öğrenci Listesi', plural: 'Öğrenci Listesi' },
          fields: [
            { type: 'text', name: 'heading', label: 'Bölüm Başlığı', defaultValue: 'Öğrencilerimiz' },
            {
              type: 'array',
              name: 'items',
              label: 'Öğrenciler',
              fields: [
                { type: 'text', name: 'name', label: 'Ad Soyad' },
                { type: 'text', name: 'university', label: 'Üniversite' },
                { type: 'text', name: 'department', label: 'Bölüm / Program' },
              ],
            },
          ],
        },
        {
          slug: 'contactBlock',
          labels: { singular: 'İletişim', plural: 'İletişim Bölümleri' },
          fields: [
            { type: 'text', name: 'heading', label: 'Başlık', defaultValue: 'Bizimle İletişime Geç' },
            { type: 'textarea', name: 'address', label: 'Adres' },
            { type: 'text', name: 'phone', label: 'Telefon' },
            { type: 'text', name: 'email', label: 'E-posta' },
          ],
        },
      ],
    },
  ],
}
export { Pages }
export default Pages
