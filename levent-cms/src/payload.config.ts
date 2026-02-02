import path from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const require = createRequire(import.meta.url)
// Vercel serverless'ta sharp linux binary sorunu olabiliyor; sadece yerelde kullan
const sharp = process.env.VERCEL === '1' ? undefined : require('sharp')
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Forms } from './collections/Forms'
import { Instructors } from './collections/Instructors'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

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
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'gizli-anahtar-degistirin',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: usePostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseUrl ?? '',
        },
        // Vercel'de tablolar yoksa ilk istekte şemayı oluşturur. Tablolar oluştuktan sonra false yapıp migration kullanın.
        push: isVercel,
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
