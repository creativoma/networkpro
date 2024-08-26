import { useState, useEffect } from 'react'
import { getProfessionals } from '@/lib/api'
import { Professional } from '@/types'

export function useProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfessionals() {
      try {
        const data = await getProfessionals()
        setProfessionals(data)
      } catch (err) {
        console.error('Error fetching professionals:', err)
        setError('Failed to load professionals')
      } finally {
        setLoading(false)
      }
    }
    fetchProfessionals()
  }, [])

  return { professionals, loading, error }
}