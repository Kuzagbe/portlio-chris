import { groq } from 'next-sanity'
import { client, isSanityConfigured } from './client'

// Projects query - returns image objects for proper URL building
export async function getProjects() {
  try {
    const configured = isSanityConfigured()
    
    if (!configured) {
      console.warn('⚠️ Sanity not configured')
      return []
    }
    
    console.log('🔄 Fetching projects from Sanity...')
    const projects = await client.fetch(groq`*[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      mainImage,
      link,
      tags
    }`)
    console.log('✅ Projects fetched:', projects.length, 'items')
    return projects
  } catch (error) {
    console.error('❌ Error fetching projects:', error)
    return []
  }
}

// Posts query
export async function getPosts() {
  try {
    if (!isSanityConfigured()) {
      console.warn('Sanity not configured, returning empty array')
      return []
    }
    return await client.fetch(groq`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      overview,
      mainImage,
      body
    }`)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Single post by slug
export async function getPostBySlug(slug: string) {
  try {
    if (!isSanityConfigured()) {
      console.warn('Sanity not configured, returning null')
      return null
    }
    return await client.fetch(
      groq`*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        overview,
        mainImage,
        body
      }`,
      { slug }
    )
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Experiences query - returns image objects
export async function getExperiences() {
  try {
    if (!isSanityConfigured()) {
      console.warn('Sanity not configured, returning empty array')
      return []
    }
    return await client.fetch(groq`*[_type == "experience"] | order(_createdAt desc) {
      _id,
      company,
      companyLogo,
      role,
      duration,
      description,
      technologies
    }`)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
}

// Hero query - returns image object
export async function getHero() {
  try {
    if (!isSanityConfigured()) {
      console.warn('Sanity not configured, returning null')
      return null
    }
    return await client.fetch(groq`*[_type == "hero"][0] {
      name,
      roles,
      bio,
      profileImage
    }`)
  } catch (error) {
    console.error('Error fetching hero:', error)
    return null
  }
}

// About query - returns image objects
export async function getAbout() {
  try {
    if (!isSanityConfigured()) {
      console.warn('Sanity not configured, returning null')
      return null
    }
    return await client.fetch(groq`*[_type == "about"][0] {
      heading,
      bio,
      travelPhotos[] {
        _key,
        location,
        image,
        className
      }
    }`)
  } catch (error) {
    console.error('Error fetching about:', error)
    return null
  }
}

// Contact query
export async function getContact() {
  try {
    if (!isSanityConfigured()) {
      console.warn('Sanity not configured, returning null')
      return null
    }
    return await client.fetch(groq`*[_type == "contact"][0] {
      heading,
      description,
      socialLinks {
        instagram,
        linkedin,
        github
      }
    }`)
  } catch (error) {
    console.error('Error fetching contact:', error)
    return null
  }
}

// Testimonials query - returns image objects
export async function getTestimonials() {
  try {
    if (!isSanityConfigured()) {
      console.warn('Sanity not configured, returning empty array')
      return []
    }
    return await client.fetch(groq`*[_type == "testimonial"] {
      _id,
      name,
      text,
      image
    }`)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

// Timeline achievements query
export async function getTimeline() {
  try {
    if (!isSanityConfigured()) {
      console.warn('Sanity not configured, returning empty array')
      return []
    }
    return await client.fetch(groq`*[_type == "timeline"] | order(year desc, order asc, _createdAt asc) {
      _id,
      year,
      title,
      description,
      order
    }`)
  } catch (error) {
    console.error('Error fetching timeline:', error)
    return []
  }
}
