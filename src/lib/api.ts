import { supabase } from './supabase'
import { Professional, Event, Job, Connection, Message, Favorite, EventRegistration, User } from '@/types'

// ============================================
// PROFESSIONALS
// ============================================
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

export async function getProfessionalById(id: string): Promise<Professional | null> {
  const { data, error } = await supabase
    .from('professionals')
    .select('*')
    .eq('id', id)
    .single()
  if (error) {
    console.error('Error fetching professional:', error)
    return null
  }
  return data
}

export async function createProfessional(professional: Omit<Professional, 'id'>): Promise<Professional> {
  const { data, error } = await supabase
    .from('professionals')
    .insert(professional)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateProfessional(id: string, updates: Partial<Professional>): Promise<Professional> {
  const { data, error } = await supabase
    .from('professionals')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ============================================
// EVENTS
// ============================================
export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })
  if (error) {
    console.error('Error fetching events:', error)
    return []
  }
  return data as Event[] || []
}

export async function getEventById(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()
  if (error) {
    console.error('Error fetching event:', error)
    return null
  }
  return data
}

export async function createEvent(event: Omit<Event, 'id'>): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single()
  if (error) throw error
  return data
}

// ============================================
// JOBS
// ============================================
export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_active', true)
    .order('posted_at', { ascending: false })
  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
  return (data || []).map(job => ({
    ...job,
    requirements: job.requirements || [],
    skills: job.skills || []
  }))
}

export async function getJobById(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()
  if (error) {
    console.error('Error fetching job:', error)
    return null
  }
  return data
}

export async function createJob(job: Omit<Job, 'id'>): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .insert(job)
    .select()
    .single()
  if (error) throw error
  return data
}

// ============================================
// EVENT REGISTRATIONS
// ============================================
export async function registerForEvent(eventId: string, userId: string): Promise<EventRegistration> {
  const { data, error } = await supabase
    .from('event_registrations')
    .insert({
      event_id: eventId,
      user_id: userId,
      status: 'registered'
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function cancelEventRegistration(eventId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('event_registrations')
    .delete()
    .eq('event_id', eventId)
    .eq('user_id', userId)
  if (error) throw error
}

export async function getEventRegistrations(userId: string): Promise<EventRegistration[]> {
  const { data, error } = await supabase
    .from('event_registrations')
    .select('*')
    .eq('user_id', userId)
  if (error) {
    console.error('Error fetching event registrations:', error)
    return []
  }
  return data || []
}

export async function isUserRegisteredForEvent(eventId: string, userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('event_registrations')
    .select('id')
    .eq('event_id', eventId)
    .eq('user_id', userId)
    .single()
  return !error && !!data
}

// ============================================
// CONNECTIONS
// ============================================
export async function sendConnectionRequest(requesterId: string, addresseeId: string): Promise<Connection> {
  const { data, error } = await supabase
    .from('connections')
    .insert({
      requester_id: requesterId,
      addressee_id: addresseeId,
      status: 'pending'
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function acceptConnectionRequest(connectionId: string): Promise<Connection> {
  const { data, error } = await supabase
    .from('connections')
    .update({ status: 'accepted' })
    .eq('id', connectionId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function rejectConnectionRequest(connectionId: string): Promise<Connection> {
  const { data, error } = await supabase
    .from('connections')
    .update({ status: 'rejected' })
    .eq('id', connectionId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getConnections(userId: string): Promise<Connection[]> {
  const { data, error } = await supabase
    .from('connections')
    .select('*')
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
    .eq('status', 'accepted')
  if (error) {
    console.error('Error fetching connections:', error)
    return []
  }
  return data || []
}

export async function getConnectionStatus(userId1: string, userId2: string): Promise<Connection | null> {
  const { data, error } = await supabase
    .from('connections')
    .select('*')
    .or(`and(requester_id.eq.${userId1},addressee_id.eq.${userId2}),and(requester_id.eq.${userId2},addressee_id.eq.${userId1})`)
    .single()
  if (error) return null
  return data
}

// ============================================
// MESSAGES
// ============================================
export async function sendMessage(senderId: string, receiverId: string, content: string): Promise<Message> {
  const { data, error } = await supabase
    .from('messages')
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      read: false
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function getMessages(userId: string, otherUserId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
    .order('created_at', { ascending: true })
  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }
  return data || []
}

export async function markMessageAsRead(messageId: string): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('id', messageId)
  if (error) throw error
}

export async function getConversations(userId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching conversations:', error)
    return []
  }
  return data || []
}

// ============================================
// FAVORITES
// ============================================
export async function addToFavorites(userId: string, type: 'professional' | 'job' | 'event', itemId: string): Promise<Favorite> {
  const favoriteData: any = { user_id: userId }

  if (type === 'professional') favoriteData.professional_id = itemId
  else if (type === 'job') favoriteData.job_id = itemId
  else if (type === 'event') favoriteData.event_id = itemId

  const { data, error } = await supabase
    .from('favorites')
    .insert(favoriteData)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function removeFromFavorites(favoriteId: string): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('id', favoriteId)
  if (error) throw error
}

export async function getFavorites(userId: string): Promise<Favorite[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
  if (error) {
    console.error('Error fetching favorites:', error)
    return []
  }
  return data || []
}

export async function isFavorite(userId: string, type: 'professional' | 'job' | 'event', itemId: string): Promise<boolean> {
  let query = supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)

  if (type === 'professional') query = query.eq('professional_id', itemId)
  else if (type === 'job') query = query.eq('job_id', itemId)
  else if (type === 'event') query = query.eq('event_id', itemId)

  const { data, error } = await query.single()
  return !error && !!data
}

// ============================================
// USERS
// ============================================
export async function getUserProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  return data
}

export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function createUserProfile(user: Omit<User, 'created_at' | 'updated_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single()
  if (error) throw error
  return data
}