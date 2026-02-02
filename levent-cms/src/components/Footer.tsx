import Link from 'next/link'

type FooterLink = { label?: string; url?: string }
type Props = {
  data: {
    copyright?: string | null
    links?: FooterLink[] | null
  } | null
}

export function SiteFooter({ data }: Props) {
  if (!data) return null
  const links = (data.links || []) as FooterLink[]
  return (
    <footer className="footer-bg bg-[var(--tg-common-color-gray-3)]">
      <div className="copyright__wrapper border-t border-[var(--tg-border-1)] bg-[var(--tg-common-color-white)] py-6">
        <div className="container-eduvalt">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="copyright__text text-center md:text-left">
              {data.copyright && (
                <p className="m-0 text-sm text-[var(--tg-body-color)]">{data.copyright}</p>
              )}
            </div>
            {links.length > 0 && (
              <nav className="copyright__menu">
                <ul className="list-wrap flex flex-wrap justify-center gap-6 md:justify-end">
                  {links.map((link, i) => (
                    <li key={i} className="list-none">
                      <Link
                        href={link.url || '#'}
                        className="text-sm text-[var(--tg-body-color)] transition hover:text-[var(--tg-theme-primary)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
