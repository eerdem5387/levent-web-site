import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
import { SiteHeader } from '@/components/Header'
import { SiteFooter } from '@/components/Footer'
import { Blocks } from '@/components/blocks/Blocks'
import type { Block } from '@/components/blocks/Blocks'

type Props = { params: Promise<{ slug: string[] }> }

export default async function PageBySlug({ params }: Props) {
  const { slug: slugSegments } = await params
  const fullSlug = Array.isArray(slugSegments) && slugSegments.length > 0 ? slugSegments.join('/') : null
  if (!fullSlug) notFound()

  const payload = await getPayloadClient()
  const [header, footer, pageResult, postsResult, instructorsResult] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.find({
      collection: 'pages',
      where: { slug: { equals: fullSlug } },
      limit: 1,
      depth: 2,
    }),
    payload.find({
      collection: 'posts',
      limit: 20,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'instructors',
      limit: 200,
      sort: 'order',
      depth: 1,
    }),
  ])

  const page = pageResult.docs[0] ?? null
  if (!page) notFound()

  const layout = (page.layout ?? []) as Block[] | undefined
  const newsPosts = postsResult.docs ?? []
  const instructors = instructorsResult.docs ?? []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader data={header} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12">
          {page.title && (
            <h1 className="mb-10 text-3xl font-bold text-zinc-900">{page.title}</h1>
          )}
          <Blocks blocks={layout} newsPosts={newsPosts} instructors={instructors} />
        </div>
      </main>
      <SiteFooter data={footer} />
    </div>
  )
}
