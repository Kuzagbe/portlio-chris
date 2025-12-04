import { defineField, defineType } from 'sanity'

// List of popular technologies with their icon identifiers (same as experience)
const technologyOptions = [
  { value: 'react', title: 'React' },
  { value: 'typescript', title: 'TypeScript' },
  { value: 'javascript', title: 'JavaScript' },
  { value: 'nodejs', title: 'Node.js' },
  { value: 'python', title: 'Python' },
  { value: 'go', title: 'Go' },
  { value: 'rust', title: 'Rust' },
  { value: 'php', title: 'PHP' },
  { value: 'ruby', title: 'Ruby' },
  { value: 'swift', title: 'Swift' },
  { value: 'kotlin', title: 'Kotlin' },
  { value: 'docker', title: 'Docker' },
  { value: 'kubernetes', title: 'Kubernetes' },
  { value: 'aws', title: 'AWS' },
  { value: 'googlecloud', title: 'Google Cloud' },
  { value: 'mongodb', title: 'MongoDB' },
  { value: 'postgresql', title: 'PostgreSQL' },
  { value: 'mysql', title: 'MySQL' },
  { value: 'redis', title: 'Redis' },
  { value: 'graphql', title: 'GraphQL' },
  { value: 'apollo', title: 'Apollo' },
  { value: 'redux', title: 'Redux' },
  { value: 'vue', title: 'Vue.js' },
  { value: 'angular', title: 'Angular' },
  { value: 'nextjs', title: 'Next.js' },
  { value: 'express', title: 'Express' },
  { value: 'django', title: 'Django' },
  { value: 'flask', title: 'Flask' },
  { value: 'spring', title: 'Spring' },
  { value: 'tailwindcss', title: 'Tailwind CSS' },
  { value: 'bootstrap', title: 'Bootstrap' },
  { value: 'sass', title: 'SASS' },
  { value: 'less', title: 'Less' },
  { value: 'webpack', title: 'Webpack' },
  { value: 'vite', title: 'Vite' },
  { value: 'jest', title: 'Jest' },
  { value: 'cypress', title: 'Cypress' },
  { value: 'git', title: 'Git' },
  { value: 'github', title: 'GitHub' },
  { value: 'gitlab', title: 'GitLab' },
  { value: 'bitbucket', title: 'Bitbucket' },
  { value: 'figma', title: 'Figma' },
  { value: 'adobexd', title: 'Adobe XD' },
  { value: 'firebase', title: 'Firebase' },
  { value: 'supabase', title: 'Supabase' },
  { value: 'vercel', title: 'Vercel' },
  { value: 'netlify', title: 'Netlify' },
  { value: 'heroku', title: 'Heroku' },
  { value: 'shopify', title: 'Shopify' },
  { value: 'wordpress', title: 'WordPress' },
  { value: 'drupal', title: 'Drupal' },
  { value: 'html5', title: 'HTML5' },
  { value: 'css3', title: 'CSS3' },
  { value: 'threejs', title: 'Three.js' },
  { value: 'framer', title: 'Framer Motion' },
]

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: technologyOptions,
          },
        },
      ],
      description: 'Select technologies used in this project. Start typing to see suggestions with icons.',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { value: 'ux-design', title: 'UX Design' },
              { value: 'ux-engineering', title: 'UX Engineering' },
              { value: 'product-management', title: 'Product Management' },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
      description: 'Select one or more categories this project falls under.',
    }),
    // Legacy field for backward compatibility - will be removed in future
    defineField({
      name: 'category',
      title: 'Category (Legacy)',
      type: 'string',
      options: {
        list: [
          { value: 'ux-design', title: 'UX Design' },
          { value: 'ux-engineering', title: 'UX Engineering' },
          { value: 'product-management', title: 'Product Management' },
        ],
        layout: 'radio',
      },
      hidden: true, // Hide from UI but keep in schema for backward compatibility
      description: 'Legacy field - use Categories instead. This field is kept for backward compatibility.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave empty to use creation date.',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  orderings: [
    {
      title: 'Order (Low to High)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Created Date (Newest)',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
})

