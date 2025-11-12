export interface Professional {
  id: string;
  user_id?: string;
  name: string;
  profession: string;
  company?: string;
  avatar?: string;
  description?: string;
  location?: string;
  preferences?: string[];
  industry?: string;
  experience?: number;
  status?: 'available' | 'busy' | 'not_available';
  skills?: string[];
  education?: string;
  certifications?: string[];
  languages?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description?: string;
  organizer_id?: string;
  image?: string;
  category?: string;
  max_attendees?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description?: string;
  location: string;
  job_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary_range?: string;
  requirements?: string[];
  skills?: string[];
  posted_by?: string;
  posted_at?: string;
  expires_at?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Connection {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at?: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  professional_id?: string;
  job_id?: string;
  event_id?: string;
  created_at?: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  status: 'registered' | 'attended' | 'cancelled';
  registered_at?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  company?: string;
  profession?: string;
  created_at?: string;
  updated_at?: string;
}