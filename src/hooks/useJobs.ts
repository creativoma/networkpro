import { useEffect, useState } from 'react'
import { Job } from '@/types'
import { getJobs } from '@/lib/api'

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true)
        const data = await getJobs()
        setJobs(data)
      } catch (err) {
        setError('Failed to fetch jobs')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  return { jobs, loading, error }
}
