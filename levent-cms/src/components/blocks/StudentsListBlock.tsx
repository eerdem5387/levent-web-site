type Item = { name?: string; university?: string; department?: string }
type Props = { heading?: string; items?: Item[] }

export function StudentsListBlock({ heading, items }: Props) {
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
        <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="rounded-lg border border-[var(--tg-border-1)] bg-[var(--tg-common-color-white)] p-4"
            >
              {item.name && (
                <span className="font-semibold text-[var(--tg-heading-color)]">{item.name}</span>
              )}
              {item.university && (
                <span className="text-[var(--tg-body-color)]"> {item.university}</span>
              )}
              {item.department && (
                <span className="block text-sm text-[var(--tg-theme-primary)]"> – {item.department}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
