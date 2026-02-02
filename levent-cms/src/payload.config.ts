import path from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
// Vercel serverless'ta sharp linux binary sorunu olabiliyor; sadece yerelde kullan
const sharp = process.env.VERCEL === '1' ? undefined : require('sharp')
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'

// Migration sırasında lexical/Pages/Posts yüklenmez (require + TLA hatası); minimal şema kullanılır
const isMigrating = process.env.PAYLOAD_MIGRATING === 'true'

// Tüm koleksiyon/global require ile (config require() ile yüklendiğinde ESM döngüsü olmasın)
const Users = require('./collections/Users.ts').default
const Media = require('./collections/Media.ts').default
const Forms = require('./collections/Forms.ts').default
const Instructors = require('./collections/Instructors.ts').default
const Header = require('./globals/Header.ts').default
const Footer = require('./globals/Footer.ts').default

function getMinimalPages() {
  return {
    slug: 'pages',
    access: { read: () => true },
    admin: { useAsTitle: 'title', description: 'Site sayfaları.' },
    labels: { singular: 'Sayfa', plural: 'Sayfalar' },
    fields: [
      { name: 'title', type: 'text', required: true, label: 'Sayfa Başlığı' },
      { name: 'slug', type: 'text', required: true, unique: true, label: 'URL (slug)' },
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
              { type: 'upload', name: 'image', relationTo: 'media', label: 'Banner görseli' },
            ],
          },
          {
            slug: 'richText',
            labels: { singular: 'Metin', plural: 'Metin Bölümleri' },
            fields: [{ type: 'textarea', name: 'content', label: 'İçerik' }],
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
              { type: 'relationship', name: 'form', relationTo: 'forms', required: true, label: 'Form' },
            ],
          },
          {
            slug: 'newsList',
            labels: { singular: 'Haber Listesi', plural: 'Haber Listesi Bölümleri' },
            fields: [
              { type: 'text', name: 'heading', label: 'Bölüm Başlığı' },
              { type: 'textarea', name: 'description', label: 'Açıklama' },
              { type: 'number', name: 'limit', label: 'Kaç haber', defaultValue: 6 },
            ],
          },
          {
            slug: 'instructorsGrid',
            labels: { singular: 'Kadro Listesi', plural: 'Kadro Listesi' },
            fields: [{ type: 'text', name: 'heading', label: 'Bölüm Başlığı', defaultValue: 'Kadromuz' }],
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
}

function getMinimalPosts() {
  return {
    slug: 'posts',
    access: { read: () => true },
    admin: { useAsTitle: 'title', description: 'Haber ve etkinlik yazıları' },
    labels: { singular: 'Haber', plural: 'Haberler' },
    fields: [
      { name: 'title', type: 'text', required: true, label: 'Başlık' },
      { name: 'slug', type: 'text', required: true, unique: true, label: 'URL (slug)' },
      { name: 'excerpt', type: 'textarea', label: 'Özet' },
      { name: 'content', type: 'textarea', label: 'İçerik' },
      { name: 'featuredImage', type: 'upload', relationTo: 'media', label: 'Kapak Görseli' },
      { name: 'category', type: 'text', label: 'Kategori' },
      { name: 'publishedAt', type: 'date', label: 'Yayın Tarihi' },
    ],
    defaultSort: '-publishedAt',
  }
}

let Pages
let Posts
let editor

if (!isMigrating) {
  const lexical = require('@payloadcms/richtext-lexical')
  editor = lexical.lexicalEditor()
  Pages = require('./collections/Pages.ts').default
  Posts = require('./collections/Posts.ts').default
} else {
  Pages = getMinimalPages()
  Posts = getMinimalPosts()
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = process.env.DATABASE_URL
const isVercel = process.env.VERCEL === '1'
// Vercel'de SQLite çalışmaz; mutlaka PostgreSQL kullan
const usePostgres = isVercel ? !!databaseUrl : databaseUrl?.startsWith('postgres')

if (isVercel && !databaseUrl?.startsWith('postgres')) {
  throw new Error(
    'Vercel ortamında DATABASE_URL (PostgreSQL) zorunludur. Project Settings → Environment Variables → DATABASE_URL ekleyin.',
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' – Levent Kolej Yönetim',
    },
  },
  collections: [Users, Media, Pages, Posts, Forms, Instructors],
  globals: [Header, Footer],
  ...(editor ? { editor } : {}),
  secret: process.env.PAYLOAD_SECRET || 'gizli-anahtar-degistirin',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseUrl ?? '',
        },
        // Vercel'de veya PUSH_SCHEMA=1 ile yerelde Postgres'e şemayı otomatik oluşturur.
        push: isVercel || process.env.PUSH_SCHEMA === '1',
      })
    : sqliteAdapter({
        client: {
          url: databaseUrl || 'file:./payload.db',
        },
      }),
  ...(sharp ? { sharp } : {}),
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
