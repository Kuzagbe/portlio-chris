import { defineField, defineType } from 'sanity'

// List of popular technologies with their icon identifiers
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
]

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
        name: 'companyLogo',
        title: 'Company Logo',
        type: 'image',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string', // e.g., "June 2020 - Present"
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'technologies',
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
      description: 'Select technologies used. Start typing to see suggestions with icons.',
    }),
  ],
})

