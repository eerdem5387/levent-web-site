import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
import { SiteHeader } from '@/components/Header'
import { SiteFooter } from '@/components/Footer'
import { Blocks } from '@/components/blocks/Blocks'
import type { Block } from '@/components/blocks/Blocks'

export default async function HomePage() {
  let header: unknown = null
  let footer: unknown = null
  let pageResult: { docs: unknown[] } = { docs: [] }
  let postsResult: { docs: unknown[] } = { docs: [] }
  let initError: Error | null = null

  try {
    const payload = await getPayloadClient()
    ;[header, footer, pageResult, postsResult] = await Promise.all([
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
  } catch (err) {
    initError = err instanceof Error ? err : new Error(String(err))
  }

  if (initError) {
    return (
      <div className="min-h-screen bg-zinc-50 p-6">
        <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-white p-6 shadow">
          <h1 className="text-xl font-bold text-red-800">Sunucu hatası</h1>
          <p className="mt-2 font-mono text-sm text-zinc-700">{initError.message}</p>
          {initError.stack && (
            <pre className="mt-4 overflow-auto rounded bg-zinc-100 p-4 text-xs text-zinc-600">{initError.stack}</pre>
          )}
        </div>
      </div>
    )
  }

  const page = pageResult.docs[0] ?? null
  const layout = ((page as { layout?: Block[] })?.layout ?? []) as Block[]
  const newsPosts = postsResult.docs ?? []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader data={header as Parameters<typeof SiteHeader>[0]['data']} />
      <main className="flex-1">
        {layout?.length ? (
          <Blocks blocks={layout} newsPosts={newsPosts as Parameters<typeof Blocks>[0]['newsPosts']} instructors={[]} />
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
      <SiteFooter data={footer as Parameters<typeof SiteFooter>[0]['data']} />
    </div>
  )
}
