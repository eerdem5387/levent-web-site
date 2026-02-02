import type { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
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
export { Users }
export default Users
