type Props = {
  heading?: string
  address?: string
  phone?: string
  email?: string
}

export function ContactBlock({ heading, address, phone, email }: Props) {
  const hasAny = address || phone || email
  if (!hasAny && !heading) return null
  return (
    <section className="py-16 md:py-20">
      <div className="container-eduvalt">
        {heading && (
          <div className="section__title mb-10 text-center">
            <h2
              className="title font-heading text-2xl font-semibold leading-tight text-[var(--tg-heading-color)] md:text-3xl lg:text-4xl"
              style={{ fontFamily: 'var(--tg-heading-font-family)' }}
            >
              {heading}
            </h2>
          </div>
        )}
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          {address && (
            <p className="flex items-start gap-3 text-[var(--tg-body-color)]">
              <span className="text-[var(--tg-theme-primary)]" aria-hidden>📍</span>
              <span className="whitespace-pre-line">{address}</span>
            </p>
          )}
          {phone && (
            <p>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 font-medium text-[var(--tg-theme-primary)] hover:underline"
              >
                <span aria-hidden>📞</span>
                {phone}
              </a>
            </p>
          )}
          {email && (
            <p>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 font-medium text-[var(--tg-theme-primary)] hover:underline"
              >
                <span aria-hidden>✉️</span>
                {email}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
