type Item = { title?: string; description?: string }
type Props = { heading?: string; items?: Item[] }

export function ValuesBlock({ heading, items }: Props) {
  if (!items?.length) return null
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--tg-border-1)] bg-[var(--tg-common-color-white)] p-6 transition hover:border-[var(--tg-theme-primary)]/30 hover:shadow-md"
            >
              {item.title && (
                <h3
                  className="mb-2 font-heading text-lg font-semibold text-[var(--tg-heading-color)]"
                  style={{ fontFamily: 'var(--tg-heading-font-family)' }}
                >
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="m-0 text-sm leading-relaxed text-[var(--tg-body-color)]">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
