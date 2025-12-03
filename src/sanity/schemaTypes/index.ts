import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import post from './post'
import experience from './experience'
import hero from './hero'
import about from './about'
import contact from './contact'
import testimonial from './testimonial'
import timeline from './timeline'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, post, experience, hero, about, contact, testimonial, timeline],
}

