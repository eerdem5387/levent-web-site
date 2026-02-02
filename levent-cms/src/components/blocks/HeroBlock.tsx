import Link from 'next/link'

const DEFAULT_HERO_IMAGE = '/uploads/2024/09/rana-banner-img-min.png'

function getImageUrl(img: { url?: string } | number | null): string | null {
  if (!img) return null
  if (typeof img === 'object' && img !== null && 'url' in img) return (img as { url?: string }).url ?? null
  return null
}

type Props = {
  heading?: string
  subheading?: string
  ctaText?: string
  ctaLink?: string
  image?: { url?: string } | number | null
}

export function HeroBlock({ heading, subheading, ctaText, ctaLink, image }: Props) {
  const bannerUrl = getImageUrl(image ?? null) ?? DEFAULT_HERO_IMAGE
  return (
    <section className="banner-bg relative flex min-h-[520px] items-end bg-[var(--tg-common-color-gray-2)] pt-[120px] md:min-h-[600px] md:pt-[140px] lg:pt-[163px]">
      {/* Eduvalt dekoratif şekiller */}
      <img
        src="/theme/objects/categories_shape03.svg"
        alt=""
        className="banner__content shape absolute left-0 top-[4%] z-0 max-w-[58px] opacity-60 lg:left-[-15%]"
        aria-hidden
      />
      <img
        src="/theme/objects/categories_shape04.svg"
        alt=""
        className="banner__content shape absolute right-[41%] top-[-15px] z-0 max-w-[44px] opacity-60"
        aria-hidden
      />
      {/* Banner görseli (leventokullari.com ile aynı: uploads/2024/09/rana-banner-img-min.png) */}
      <div className="container-eduvalt relative z-10 flex w-full flex-wrap items-end justify-between gap-8">
        <div className="banner__content mx-auto max-w-4xl py-10 md:py-14 lg:py-16">
          {subheading && (
            <span className="banner__content sub-title mb-4 inline-block rounded bg-[var(--tg-common-color-gray)] px-4 py-2 text-sm font-medium text-[var(--tg-theme-primary)]">
              {subheading}
            </span>
          )}
          {heading && (
            <h1
              className="banner__content title mb-5 font-heading text-3xl font-semibold leading-tight text-[var(--tg-heading-color)] md:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--tg-heading-font-family)' }}
            >
              {heading}
            </h1>
          )}
          {(ctaText && ctaLink) && (
            <div className="banner__btn-wrap mt-8 flex flex-wrap gap-4">
              <Link href={ctaLink} className="btn-eduvalt">
                {ctaText}
              </Link>
            </div>
          )}
        </div>
        <img
          src={bannerUrl}
          alt=""
          className="banner__img order-2 h-auto max-h-[420px] w-full max-w-md object-contain md:max-w-lg"
          aria-hidden
        />
      </div>
    </section>
  )
}
