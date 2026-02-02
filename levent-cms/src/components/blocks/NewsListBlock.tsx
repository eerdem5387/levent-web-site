import Link from 'next/link'

type Post = {
  id: string | number
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  category?: string | null
  publishedAt?: string | null
  featuredImage?: { url?: string | null } | number | null
}

type Props = {
  heading?: string
  description?: string
  limit?: number
  posts?: Post[]
}

function getImageUrl(img: Post['featuredImage']): string | null {
  if (!img) return null
  if (typeof img === 'object' && img !== null && 'url' in img) return (img as { url?: string | null }).url ?? null
  return null
}

function formatDate(date: string | null | undefined): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function NewsListBlock({ heading, description, limit = 6, posts = [] }: Props) {
  const items = posts.slice(0, limit || 6)
  if (!items.length) return null
  return (
    <section className="grey-bg py-16 md:py-20" style={{ background: 'var(--tg-common-color-gray-2)' }}>
      <div className="container-eduvalt">
        <div className="section__title mb-10 text-center">
          {heading && (
            <h2
              className="title mb-4 font-heading text-2xl font-semibold leading-tight text-[var(--tg-heading-color)] md:text-3xl"
              style={{ fontFamily: 'var(--tg-heading-font-family)' }}
            >
              {heading}
            </h2>
          )}
          {description && (
            <p className="desc mx-auto max-w-2xl text-[var(--tg-body-color)]">{description}</p>
          )}
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => {
            const imgUrl = getImageUrl(post.featuredImage)
            return (
              <Link
                key={post.id}
                href={`/haber/${post.slug ?? String(post.id)}`}
                className="group overflow-hidden rounded-lg border border-[var(--tg-border-1)] bg-[var(--tg-common-color-white)] transition hover:border-[var(--tg-theme-primary)]/30 hover:shadow-md"
              >
                {imgUrl && (
                  <div className="aspect-video w-full overflow-hidden bg-[var(--tg-common-color-gray)]">
                    <img
                      src={imgUrl}
                      alt={post.title || ''}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.category && (
                    <span className="text-xs font-medium uppercase tracking-wide text-[var(--tg-theme-primary)]">
                      {post.category}
                    </span>
                  )}
                  <h3
                    className="mt-2 font-heading text-lg font-semibold text-[var(--tg-heading-color)] transition group-hover:text-[var(--tg-theme-primary)]"
                    style={{ fontFamily: 'var(--tg-heading-font-family)' }}
                  >
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-[var(--tg-body-color)]">{post.excerpt}</p>
                  )}
                  {post.publishedAt && (
                    <p className="mt-3 text-xs text-[var(--tg-body-color)] opacity-80">
                      {formatDate(post.publishedAt)}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
