import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { SiteHeader } from '@/components/Header'
import { SiteFooter } from '@/components/Footer'
import { RichTextBlock } from '@/components/blocks/RichTextBlock'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

function getImageUrl(img: { url?: string } | number | null): string | null {
  if (!img) return null
  if (typeof img === 'object' && img !== null && 'url' in img) return (img as { url?: string }).url ?? null
  return null
}

function formatDate(date: string | null | undefined): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const [header, footer, postResult] = await Promise.all([
    payload.findGlobal({ slug: 'header' }),
    payload.findGlobal({ slug: 'footer' }),
    payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
    }),
  ])

  const post = postResult.docs[0] ?? null
  if (!post) notFound()

  const imgUrl = getImageUrl(post.featuredImage as { url?: string } | number | null)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader data={header} />
      <main className="flex-1">
        <article className="container-eduvalt py-12">
          <Link
            href="/haber"
            className="mb-6 inline-block text-sm font-medium text-[var(--tg-theme-primary)] hover:underline"
          >
            ← Haberler
          </Link>
          {post.category && (
            <span className="text-xs font-medium uppercase tracking-wide text-[var(--tg-theme-primary)]">
              {post.category}
            </span>
          )}
          <h1
            className="mt-2 font-heading text-3xl font-semibold text-[var(--tg-heading-color)] md:text-4xl"
            style={{ fontFamily: 'var(--tg-heading-font-family)' }}
          >
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="mt-3 text-sm text-[var(--tg-body-color)] opacity-80">{formatDate(post.publishedAt)}</p>
          )}
          {imgUrl && (
            <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg bg-[var(--tg-common-color-gray)]">
              <img src={imgUrl} alt={post.title || ''} className="h-full w-full object-cover" />
            </div>
          )}
          <div className="mt-8">
            <RichTextBlock content={post.content} />
          </div>
        </article>
      </main>
      <SiteFooter data={footer} />
    </div>
  )
}
