const CATEGORIES = [
  { label: 'Rehberlik Uzmanları', value: 'rehberlik' },
  { label: 'Matematik', value: 'matematik' },
  { label: 'Fen Bilimleri', value: 'fen' },
  { label: 'Türkçe / Edebiyat', value: 'turkce' },
  { label: 'Sosyal Bilimler', value: 'sosyal' },
  { label: 'Yabancı Diller', value: 'yabanci-dil' },
  { label: 'Kültür Branşları', value: 'kultur' },
]

const Instructors = {
  slug: 'instructors',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Kadromuz sayfasında gösterilecek öğretmen ve uzmanlar.',
    defaultColumns: ['name', 'title', 'category', 'order'],
  },
  labels: {
    singular: 'Öğretmen / Uzman',
    plural: 'Kadro',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Ad Soyad',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Ünvan (örn: Lise Baş Rehberlik Uzmanı, Matematik Zümre Başkanı)',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Branş / Kategori',
      options: CATEGORIES,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Fotoğraf',
      admin: { description: 'Boş bırakılırsa uploads/2025/08 içindeki isim eşleşmesi denenir.' },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sıra',
      defaultValue: 0,
      admin: { description: 'Kategori içinde sıralama.' },
    },
  ],
}
export { Instructors }
export default Instructors
