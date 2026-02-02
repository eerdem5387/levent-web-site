type Props = { content?: unknown }

function renderLexicalToText(node: { root?: { children?: { text?: string }[] } }): string {
  const root = node?.root
  if (!root?.children?.length) return ''
  return root.children
    .map((child: { text?: string }) => child?.text ?? '')
    .filter(Boolean)
    .join('</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>') || '<p></p>'
}

export function RichTextBlock({ content }: Props) {
  if (!content) return null
  const html =
    typeof content === 'object' && content !== null && 'root' in (content as object)
      ? renderLexicalToText(content as { root: { children?: { text?: string }[] } })
      : String(content)
  return (
    <section className="white-bg py-12 md:py-16" style={{ background: 'var(--tg-common-color-white)' }}>
      <div className="container-eduvalt">
        <div
          className="prose prose-lg max-w-none text-[var(--tg-body-color)] prose-headings:font-heading prose-headings:text-[var(--tg-heading-color)] prose-a:text-[var(--tg-theme-primary)] prose-a:no-underline hover:prose-a:underline"
          style={{ fontFamily: 'var(--tg-body-font-family)' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  )
}
