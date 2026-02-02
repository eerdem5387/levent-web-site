import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
import { SiteHeader } from '@/components/Header'
import { SiteFooter } from '@/components/Footer'
import { Blocks } from '@/components/blocks/Blocks'
import type { Block } from '@/components/blocks/Blocks'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const [header, footer, pageResult, postsResult] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.find({
      collection: 'pages',
      where: { slug: { equals: 'anasayfa' } },
      limit: 1,
      depth: 2,
    }),
    payload.find({
      collection: 'posts',
      limit: 20,
      sort: '-publishedAt',
    }),
  ])

  const page = pageResult.docs[0] ?? null
  const layout = (page?.layout ?? []) as Block[] | undefined
  const newsPosts = postsResult.docs ?? []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader data={header} />
      <main className="flex-1">
        {layout?.length ? (
          <Blocks blocks={layout} newsPosts={newsPosts} instructors={[]} />
        ) : (
          <div className="mx-auto max-w-3xl px-4 py-20 text-center">
            <h1 className="text-3xl font-bold text-zinc-900">Levent Kolej</h1>
            <p className="mt-4 text-zinc-600">
              Hoş geldiniz. İçerik yönetimi için{' '}
              <Link href="/admin" className="font-medium text-zinc-900 underline">
                /admin
              </Link>{' '}
              paneline giriş yapın. Ana sayfa içeriği için &quot;Sayfalar&quot; bölümünden slug&apos;ı
              &quot;anasayfa&quot; olan bir sayfa oluşturun.
            </p>
          </div>
        )}
      </main>
      <SiteFooter data={footer} />
    </div>
  )
}
