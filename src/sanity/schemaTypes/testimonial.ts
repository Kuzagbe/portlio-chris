import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the person giving the testimonial',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Testimonial Text',
      type: 'text',
      description: 'The testimonial content',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      description: 'Profile picture of the person',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and SEO',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'text',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Testimonial',
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No text',
        media,
      }
    },
  },
})

