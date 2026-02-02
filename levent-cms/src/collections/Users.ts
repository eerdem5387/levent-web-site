import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    description: 'Yönetici hesapları',
  },
  auth: true,
  labels: {
    singular: 'Kullanıcı',
    plural: 'Kullanıcılar',
  },
  fields: [],
}
