type Props = { form: { id: string; name?: string } | number }

export function FormBlock({ form }: Props) {
  const formId = typeof form === 'object' && form !== null && 'id' in form ? (form as { id: string }).id : null
  const formName = typeof form === 'object' && form !== null && 'name' in form ? (form as { name?: string }).name : null
  if (!formId) return null
  return (
    <section className="grey-bg py-12 md:py-16" style={{ background: 'var(--tg-common-color-gray-2)' }}>
      <div className="container-eduvalt">
        <div className="mx-auto max-w-md rounded-lg border border-[var(--tg-border-1)] bg-[var(--tg-common-color-white)] p-8">
          <p className="text-center text-sm text-[var(--tg-body-color)]">
            {formName ? `Form: ${formName}` : `Form #${formId}`}
          </p>
          {/* Form gönderimi için API route + client component eklenebilir */}
        </div>
      </div>
    </section>
  )
}
