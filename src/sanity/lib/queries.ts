import { client, isSanityConfigured } from './client'

export async function getProjects() {
  try {
    if (!isSanityConfigured()) {
      return null
    }
    return await client.fetch(`*[_type == "project"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      "mainImage": mainImage.asset->url,
      link,
      tags
    }`)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return null
  }
}

export async function getPosts() {
  try {
    if (!isSanityConfigured()) {
      return null
    }
    return await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      overview,
      body
    }`)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return null
  }
}

export async function getPostBySlug(slug: string) {
  try {
    if (!isSanityConfigured()) {
      return null
    }
    return await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        overview,
        body
      }`,
      { slug }
    )
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function getExperiences() {
  try {
    if (!isSanityConfigured()) {
      return null
    }
    return await client.fetch(`*[_type == "experience"] | order(_createdAt desc) {
      _id,
      company,
      "companyLogo": companyLogo.asset->url,
      role,
      duration,
      description,
      technologies
    }`)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return null
  }
}

export async function getHero() {
  try {
    if (!isSanityConfigured()) {
      return null
    }
    return await client.fetch(`*[_type == "hero"][0] {
      name,
      roles,
      bio,
      "profileImage": profileImage.asset->url
    }`)
  } catch (error) {
    console.error('Error fetching hero:', error)
    return null
  }
}

export async function getAbout() {
  try {
    if (!isSanityConfigured()) {
      return null
    }
    return await client.fetch(`*[_type == "about"][0] {
      heading,
      bio,
      travelPhotos[] {
        location,
        "image": image.asset->url
      }
    }`)
  } catch (error) {
    console.error('Error fetching about:', error)
    return null
  }
}

export async function getContact() {
  try {
    if (!isSanityConfigured()) {
      return null
    }
    return await client.fetch(`*[_type == "contact"][0] {
      heading,
      description
    }`)
  } catch (error) {
    console.error('Error fetching contact:', error)
    return null
  }
}

