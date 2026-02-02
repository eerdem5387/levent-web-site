import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { SiteHeader } from '@/components/Header'
import { SiteFooter } from '@/components/Footer'
import { NewsListBlock } from '@/components/blocks/NewsListBlock'

export const dynamic = 'force-dynamic'

export default async function HaberListPage() {
  const payload = await getPayloadClient()
  const [header, footer, postsResult] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.find({
      collection: 'posts',
      limit: 50,
      sort: '-publishedAt',
    }),
  ])

  const posts = postsResult.docs ?? []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader data={header} />
      <main className="flex-1">
        <NewsListBlock
          heading="Levent College Haber & Etkinlikler"
          description="Okulumuzda gerçekleştirilen projeler, geziler ve duyurular."
          limit={50}
          posts={posts}
        />
      </main>
      <SiteFooter data={footer} />
    </div>
  )
}
