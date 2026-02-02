import type { CollectionConfig } from 'payload'

export const Forms: CollectionConfig = {
  slug: 'forms',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    description: 'İletişim ve diğer formlar. Oluşturduğunuz formları sayfalarda kullanabilirsiniz.',
  },
  labels: {
    singular: 'Form',
    plural: 'Formlar',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Form Adı',
    },
    {
      name: 'recipientEmail',
      type: 'email',
      required: true,
      label: 'Bildirim E-postası',
      admin: {
        description: 'Form gönderildiğinde bu adrese mail gider.',
      },
    },
    {
      type: 'array',
      name: 'fields',
      label: 'Form Alanları',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Alan adı (teknik)',
          admin: { description: 'Örn: email, message' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Etiket',
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          label: 'Tip',
          options: [
            { label: 'Metin', value: 'text' },
            { label: 'E-posta', value: 'email' },
            { label: 'Telefon', value: 'tel' },
            { label: 'Çok satırlı metin', value: 'textarea' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Zorunlu',
          defaultValue: false,
        },
      ],
    },
  ],
}
