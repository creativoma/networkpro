'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useTheme } from 'next-themes'
import { supabase } from '@/lib/supabase'

export default function AuthComponent() {
  const { theme } = useTheme()

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: theme === 'dark' ? 'rgb(147 51 234)' : 'rgb(124 58 237)',
              brandAccent: theme === 'dark' ? 'rgb(126 34 206)' : 'rgb(109 40 217)',
            }
          }
        }
      }}
      theme={theme === 'dark' ? 'dark' : 'light'}
      providers={['google', 'github']}
    />
  )
}