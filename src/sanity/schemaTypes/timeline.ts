import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'timeline',
  title: 'Timeline Achievement',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The year of this achievement (e.g., "2024")',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The title of the achievement',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'A brief description of the achievement',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order within the year (lower numbers appear first). If not set, achievements will be ordered by creation date.',
    }),
  ],
  preview: {
    select: {
      year: 'year',
      title: 'title',
    },
    prepare({ year, title }) {
      return {
        title: title || 'Untitled',
        subtitle: year || 'No year',
      }
    },
  },
  orderings: [
    {
      title: 'Year (newest first)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Year (oldest first)',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }],
    },
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})



