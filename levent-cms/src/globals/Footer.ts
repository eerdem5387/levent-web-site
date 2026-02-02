import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Alt Bilgi (Footer)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'copyright',
      type: 'text',
      label: 'Telif metni',
    },
    {
      type: 'array',
      name: 'links',
      label: 'Footer Linkleri',
      fields: [
        { type: 'text', name: 'label', label: 'Metin' },
        { type: 'text', name: 'url', label: 'URL' },
      ],
    },
  ],
}
