'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from "@/components/ui/button"
import { supabase } from '@/lib/supabase'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold">NetworkPro</span>
        </Link>
        <div className="space-x-4">
          <Link href="/professionals">
            <Button variant="ghost">Professionals</Button>
          </Link>
          <Link href="/events">
            <Button variant="ghost">Events</Button>
          </Link>
          {user ? (
            <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
          ) : (
            <Link href="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}