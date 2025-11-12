-- NetworkPro Database Schema
-- This schema should be run in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar TEXT,
  bio TEXT,
  location TEXT,
  company TEXT,
  profession TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create professionals table
CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  profession TEXT NOT NULL,
  company TEXT,
  avatar TEXT,
  description TEXT,
  location TEXT,
  industry TEXT,
  experience INTEGER, -- years of experience
  status TEXT DEFAULT 'available', -- available, busy, not_available
  skills TEXT[], -- array of skills
  education TEXT,
  certifications TEXT[], -- array of certifications
  languages TEXT[], -- array of languages
  preferences TEXT[], -- array of preferences
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  organizer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  image TEXT,
  category TEXT,
  max_attendees INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  job_type TEXT, -- full-time, part-time, contract, remote
  salary_range TEXT,
  requirements TEXT[],
  skills TEXT[],
  posted_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'registered', -- registered, attended, cancelled
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Create connections table
CREATE TABLE IF NOT EXISTS public.connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  addressee_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- pending, accepted, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(requester_id, addressee_id),
  CHECK (requester_id != addressee_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (sender_id != receiver_id)
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (
    (professional_id IS NOT NULL AND job_id IS NULL AND event_id IS NULL) OR
    (professional_id IS NULL AND job_id IS NOT NULL AND event_id IS NULL) OR
    (professional_id IS NULL AND job_id IS NULL AND event_id IS NOT NULL)
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_professionals_user_id ON public.professionals(user_id);
CREATE INDEX IF NOT EXISTS idx_professionals_location ON public.professionals(location);
CREATE INDEX IF NOT EXISTS idx_professionals_industry ON public.professionals(industry);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(date);
CREATE INDEX IF NOT EXISTS idx_events_location ON public.events(location);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_connections_requester ON public.connections(requester_id);
CREATE INDEX IF NOT EXISTS idx_connections_addressee ON public.connections(addressee_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for professionals
CREATE POLICY "Anyone can view professionals" ON public.professionals FOR SELECT USING (true);
CREATE POLICY "Users can insert own professional profile" ON public.professionals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own professional profile" ON public.professionals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own professional profile" ON public.professionals FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for events
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON public.events FOR INSERT WITH CHECK (auth.uid() = organizer_id);
CREATE POLICY "Event organizers can update events" ON public.events FOR UPDATE USING (auth.uid() = organizer_id);
CREATE POLICY "Event organizers can delete events" ON public.events FOR DELETE USING (auth.uid() = organizer_id);

-- RLS Policies for jobs
CREATE POLICY "Anyone can view active jobs" ON public.jobs FOR SELECT USING (is_active = true OR auth.uid() = posted_by);
CREATE POLICY "Authenticated users can create jobs" ON public.jobs FOR INSERT WITH CHECK (auth.uid() = posted_by);
CREATE POLICY "Job posters can update jobs" ON public.jobs FOR UPDATE USING (auth.uid() = posted_by);
CREATE POLICY "Job posters can delete jobs" ON public.jobs FOR DELETE USING (auth.uid() = posted_by);

-- RLS Policies for event_registrations
CREATE POLICY "Users can view own registrations" ON public.event_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can register for events" ON public.event_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can cancel own registrations" ON public.event_registrations FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for connections
CREATE POLICY "Users can view own connections" ON public.connections FOR SELECT USING (auth.uid() = requester_id OR auth.uid() = addressee_id);
CREATE POLICY "Users can create connections" ON public.connections FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Users can update connections" ON public.connections FOR UPDATE USING (auth.uid() = addressee_id);
CREATE POLICY "Users can delete own connections" ON public.connections FOR DELETE USING (auth.uid() = requester_id);

-- RLS Policies for messages
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Users can update own messages" ON public.messages FOR UPDATE USING (auth.uid() = receiver_id);

-- RLS Policies for favorites
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_professionals_updated_at BEFORE UPDATE ON public.professionals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_connections_updated_at BEFORE UPDATE ON public.connections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
