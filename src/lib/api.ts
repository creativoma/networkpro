import { supabase } from './supabase'
import { Professional, Event } from '@/types'

export async function getProfessionals(): Promise<Professional[]> {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
  if (error) {
    console.error('Error fetching professionals:', error)
    return []
  }
  return (data || []).map(prof => ({
    ...prof,
    skills: prof.skills || [],
    preferences: prof.preferences || [],
    certifications: prof.certifications || [],
    languages: prof.languages || []
  }))
}

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
  if (error) {
    console.error('Error fetching events:', error)
    return []
  }
  return data as Event[] || []
}

export async function createProfessional(professional: Omit<Professional, 'id'>): Promise<Professional> {
  const { data, error } = await supabase
    .from('professionals')
    .insert(professional)
    .single()
  if (error) throw error
  return data
}

export async function createEvent(event: Omit<Event, 'id'>): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .single()
  if (error) throw error
  return data
}