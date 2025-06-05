export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant Name',
      type: 'string'
    },
    {
      name: 'neighbourhood',
      title: 'Neighbourhood',
      type: 'string'
    },
    {
      name: 'streetAddress',
      title: 'Street Address',
      type: 'string'
    },
    {
      name: 'cuisine',
      title: 'Cuisine',
      type: 'string'
    },
    {
      name: 'priceRange',
      title: 'Price Range',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'googleMapsLink',
      title: 'Google Maps Link',
      type: 'url'
    },
    {
      name: 'instagramOrWebsite',
      title: 'Instagram / Website',
      type: 'url'
    },
    {
      name: 'photoUploads',
      title: 'Uploaded Photos',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true
      }
    },
    {
      name: 'photoUrls',
      title: 'Photo URLs',
      type: 'array',
      of: [{ type: 'url' }]
    }
  ]
}