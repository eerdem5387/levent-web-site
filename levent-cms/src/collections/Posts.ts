import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Haber ve etkinlik yazıları',
  },
  labels: {
    singular: 'Haber',
    plural: 'Haberler',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Başlık',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL (slug)',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Özet',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'İçerik',
      editor: lexicalEditor(),
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Kapak Görseli',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Kategori',
      admin: { description: 'Örn: Sınav, Gezi, Müzik' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Yayın Tarihi',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
  defaultSort: '-publishedAt',
}
export { Posts }
export default Posts
