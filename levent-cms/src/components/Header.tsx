import Link from 'next/link'

type NavLink = { label?: string; url?: string }
type Props = {
  data: {
    logo?: { url?: string } | number | null
    phone?: string | null
    navLinks?: NavLink[] | null
  } | null
}

type LogoType = { url?: string } | number | null | undefined
function getLogoUrl(logo: LogoType): string | null {
  if (!logo) return null
  if (typeof logo === 'object' && logo !== null && 'url' in logo) return (logo as { url?: string }).url ?? null
  return null
}

export function SiteHeader({ data }: Props) {
  if (!data) return null
  const navLinks = (data.navLinks || []) as NavLink[]
  const logoUrl = getLogoUrl(data.logo)
  return (
    <header className="tg-header sticky top-0 z-50 border-b border-[var(--tg-border-1)] bg-[var(--tg-common-color-white)]">
      <div id="tg-header__area" className="container-eduvalt">
        <div className="flex min-h-[80px] items-center justify-between gap-4 py-3">
          <Link href="/" className="flex shrink-0 items-center">
            {logoUrl ? (
              <img src={logoUrl} alt="Levent Kolej" className="h-10 max-h-12 w-auto object-contain md:h-12" />
            ) : (
              <span className="font-heading text-xl font-semibold text-[var(--tg-heading-color)]" style={{ fontFamily: 'var(--tg-heading-font-family)' }}>
                Levent Kolej
              </span>
            )}
          </Link>
          <nav className="tgmenu__main-menu hidden flex-1 items-center justify-center gap-8 xl:flex">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.url || '#'}
                className="text-[15px] font-medium text-[var(--tg-heading-color)] transition hover:text-[var(--tg-theme-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {data.phone && (
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              className="shrink-0 text-[15px] font-medium text-[var(--tg-theme-primary)] hover:text-[var(--tg-theme-secondary)]"
            >
              {data.phone}
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
