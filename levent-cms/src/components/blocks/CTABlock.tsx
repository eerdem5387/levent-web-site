import Link from 'next/link'

type Props = {
  heading?: string
  description?: string
  buttonText?: string
  buttonLink?: string
}

export function CTABlock({ heading, description, buttonText, buttonLink }: Props) {
  return (
    <section className="relative overflow-hidden bg-[var(--tg-theme-secondary)] py-16 md:py-20">
      <img
        src="/theme/objects/cta_shape01.svg"
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 z-0 max-h-[120px] opacity-40"
        aria-hidden
      />
      <img
        src="/theme/objects/cta_shape02.svg"
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 z-0 max-h-[120px] opacity-40"
        aria-hidden
      />
      <div className="container-eduvalt relative z-10">
        <div className="section__title mx-auto max-w-2xl text-center">
          {heading && (
            <h2
              className="title mb-4 font-heading text-2xl font-semibold leading-tight text-[var(--tg-common-color-white)] md:text-3xl"
              style={{ fontFamily: 'var(--tg-heading-font-family)' }}
            >
              {heading}
            </h2>
          )}
          {description && (
            <p className="desc mb-8 text-base leading-relaxed text-[#E6EAEF]">{description}</p>
          )}
          {(buttonText && buttonLink) && (
            <div className="banner__btn-wrap flex justify-center">
              <Link
                href={buttonLink}
                className="btn-eduvalt bg-[var(--tg-common-color-white)] !text-[var(--tg-theme-secondary)] hover:!bg-[var(--tg-common-color-gray)]"
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
