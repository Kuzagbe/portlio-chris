import { useEffect, useState, useCallback, useRef } from 'react'
import { getProjects, getPosts, getExperiences, getHero, getAbout, getContact, getTestimonials, getTimeline, getMobileInteractions } from '@/sanity/lib/queries'

// Generic hook for fetching Sanity data
function useSanityData<T>(
  fetchFn: () => Promise<T | null | T[]>, 
  fallback: T | T[]
): { data: T | T[] | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | T[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    let isMounted = true
    let isFetching = false

    async function fetchData() {
      // Prevent multiple simultaneous fetches
      if (isFetching) return
      isFetching = true
      
      try {
        setLoading(true)
        setError(null)
        console.log('🔄 useSanityData: Starting fetch...')
        const result = await fetchFn()
        console.log('📦 useSanityData: Result received:', result)
        
        if (!isMounted) return
        
        // Only use Sanity data - don't use fallback
        if (result !== null && result !== undefined) {
          if (Array.isArray(result)) {
            // For arrays, use Sanity data even if empty
            console.log('✅ useSanityData: Setting array data, length:', result.length)
            setData(result)
          } else if (result) {
            // For objects, use Sanity data
            console.log('✅ useSanityData: Setting object data')
            setData(result)
          } else {
            // No data from Sanity - set to null/empty
            console.log('⚠️ useSanityData: Result is falsy, setting empty')
            setData(Array.isArray(fallback) ? [] : null)
          }
        } else {
          // No data from Sanity - set to null/empty
          console.log('⚠️ useSanityData: Result is null/undefined, setting empty')
          setData(Array.isArray(fallback) ? [] : null)
        }
      } catch (err) {
        if (!isMounted) return
        console.error('❌ useSanityData: Error occurred:', err)
        const errorObj = err instanceof Error ? err : new Error(String(err))
        setError(errorObj)
        // On error, set to null/empty instead of fallback
        setData(Array.isArray(fallback) ? [] : null)
      } finally {
        if (isMounted) {
          setLoading(false)
          isFetching = false
          console.log('🏁 useSanityData: Fetch complete, loading:', false)
        }
      }
    }
    
    fetchData()

    return () => {
      isMounted = false
    }
  }, [fetchFn, fallback]) // Re-fetch if fetchFn or fallback changes

  return { data, loading, error }
}

// Specific hooks for each data type
export function useSanityProjects(fallback: any[] = []) {
  const fetchFn = useCallback(() => getProjects(), [])
  return useSanityData(fetchFn, fallback)
}

export function useSanityPosts(fallback: any[] = []) {
  const fetchFn = useCallback(() => getPosts(), [])
  return useSanityData(fetchFn, fallback)
}

export function useSanityExperiences(fallback: any[] = []) {
  const fetchFn = useCallback(() => getExperiences(), [])
  return useSanityData(fetchFn, fallback)
}

export function useSanityHero(fallback: any = null) {
  const fetchFn = useCallback(() => getHero(), [])
  return useSanityData(fetchFn, fallback)
}

export function useSanityAbout(fallback: any = null) {
  const fetchFn = useCallback(() => getAbout(), [])
  return useSanityData(fetchFn, fallback)
}

export function useSanityContact(fallback: any = null) {
  const fetchFn = useCallback(() => getContact(), [])
  return useSanityData(fetchFn, fallback)
}

export function useSanityTestimonials(fallback: any[] = []) {
  const fetchFn = useCallback(() => getTestimonials(), [])
  return useSanityData(fetchFn, fallback)
}

export function useSanityTimeline(fallback: any[] = []) {
  const fetchFn = useCallback(() => getTimeline(), [])
  return useSanityData(fetchFn, fallback)
}

export function useSanityMobileInteractions(fallback: any[] = []) {
  const fetchFn = useCallback(() => getMobileInteractions(), [])
  return useSanityData(fetchFn, fallback)
}
