import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mobileInteraction',
  title: 'Mobile Interaction',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Interaction Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'URL to the video file (MP4, WebM, etc.)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1-15)',
      validation: (Rule) => Rule.min(1).max(15),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'year',
    },
  },
  orderings: [
    {
      title: 'Order (Low to High)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year (Newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
})


