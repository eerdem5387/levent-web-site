import type { GlobalConfig } from 'payload'

const Header: GlobalConfig = {
  slug: 'header',
  label: 'Üst Menü (Header)',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefon',
    },
    {
      type: 'array',
      name: 'navLinks',
      label: 'Menü Linkleri',
      fields: [
        { type: 'text', name: 'label', label: 'Metin' },
        { type: 'text', name: 'url', label: 'URL' },
      ],
    },
  ],
}
export { Header }
export default Header
