'use client'

import { getInstructorImageUrl } from '@/lib/instructorImages'

const CATEGORY_LABELS: Record<string, string> = {
  rehberlik: 'Rehberlik Uzmanları',
  matematik: 'Matematik',
  fen: 'Fen Bilimleri',
  turkce: 'TÜRKÇE-TÜRK DİLİ VE EDEBİYATI',
  sosyal: 'Sosyal Bilimler',
  'yabanci-dil': 'Yabancı Diller',
  kultur: 'Kültür Branşları',
}

type Instructor = {
  id: string | number
  name?: string | null
  title?: string | null
  category?: string | null
  image?: { url?: string | null } | number | null
  order?: number | null
}

type Props = {
  heading?: string
  instructors: Instructor[]
}

function getMediaUrl(img: { url?: string | null } | number | null): string | null {
  if (!img || typeof img !== 'object' || !('url' in img)) return null
  return (img as { url?: string | null }).url ?? null
}

export function InstructorsBlock({ heading, instructors }: Props) {
  if (!instructors?.length) return null
  const byCategory = instructors.reduce<Record<string, Instructor[]>>((acc, i) => {
    const cat = (i.category as string) || 'other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(i)
    return acc
  }, {})
  const order = ['rehberlik', 'matematik', 'fen', 'turkce', 'sosyal', 'yabanci-dil', 'kultur']
  const categories = order.filter((c) => byCategory[c]?.length)

  return (
    <section className="grey-bg py-16 md:py-20" style={{ background: 'var(--tg-common-color-gray)' }}>
      <div className="container-eduvalt">
        {heading && (
          <div className="section__title mb-12 text-center">
            <h2
              className="title font-heading text-2xl font-semibold leading-tight text-[var(--tg-heading-color)] md:text-3xl lg:text-4xl"
              style={{ fontFamily: 'var(--tg-heading-font-family)' }}
            >
              {heading}
            </h2>
          </div>
        )}
        <div className="space-y-14">
          {categories.map((cat) => (
            <div key={cat}>
              <h3
                className="mb-6 font-heading text-xl font-semibold text-[var(--tg-theme-primary)]"
                style={{ fontFamily: 'var(--tg-heading-font-family)' }}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {byCategory[cat].map((instructor) => {
                  const mediaUrl = getMediaUrl(instructor.image ?? null)
                  const imgUrl = getInstructorImageUrl(instructor.name || '', mediaUrl ?? undefined)
                  return (
                    <div
                      key={String(instructor.id)}
                      className="rounded-lg border border-[var(--tg-border-1)] bg-[var(--tg-common-color-white)] overflow-hidden transition hover:border-[var(--tg-theme-primary)]/30 hover:shadow-md"
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden bg-[var(--tg-common-color-gray-2)]">
                        <img
                          src={imgUrl}
                          alt={instructor.name || ''}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        {instructor.title && (
                          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[var(--tg-theme-primary)]">
                            {instructor.title}
                          </p>
                        )}
                        {instructor.name && (
                          <h4
                            className="font-heading font-semibold text-[var(--tg-heading-color)]"
                            style={{ fontFamily: 'var(--tg-heading-font-family)' }}
                          >
                            {instructor.name}
                          </h4>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
