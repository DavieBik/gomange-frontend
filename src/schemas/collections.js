export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Collection Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Short Description'
    },
    {
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'restaurants',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'restaurant' } }],
      title: 'Restaurants in this Collection'
    }
  ]
}
