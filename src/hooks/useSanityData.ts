import { useEffect, useState } from 'react'
import { getProjects, getPosts, getExperiences, getHero, getAbout, getContact } from '@/sanity/lib/queries'

export function useSanityProjects(fallback: any[]) {
  const [projects, setProjects] = useState<any[]>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects()
        if (data && data.length > 0) {
          setProjects(data)
        }
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return { projects, loading }
}

export function useSanityPosts(fallback: any[]) {
  const [posts, setPosts] = useState<any[]>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts()
        if (data && data.length > 0) {
          setPosts(data)
        }
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return { posts, loading }
}

export function useSanityExperiences(fallback: any[]) {
  const [experiences, setExperiences] = useState<any[]>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const data = await getExperiences()
        if (data && data.length > 0) {
          setExperiences(data)
        }
      } catch (error) {
        console.error('Error loading experiences:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchExperiences()
  }, [])

  return { experiences, loading }
}

export function useSanityHero(fallback: any) {
  const [hero, setHero] = useState<any>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHero() {
      try {
        const data = await getHero()
        if (data) {
          setHero(data)
        }
      } catch (error) {
        console.error('Error loading hero:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHero()
  }, [])

  return { hero, loading }
}

export function useSanityAbout(fallback: any) {
  const [about, setAbout] = useState<any>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAbout() {
      try {
        const data = await getAbout()
        if (data) {
          setAbout(data)
        }
      } catch (error) {
        console.error('Error loading about:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  return { about, loading }
}

export function useSanityContact(fallback: any) {
  const [contact, setContact] = useState<any>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContact() {
      try {
        const data = await getContact()
        if (data) {
          setContact(data)
        }
      } catch (error) {
        console.error('Error loading contact:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchContact()
  }, [])

  return { contact, loading }
}

