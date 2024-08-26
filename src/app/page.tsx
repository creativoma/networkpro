'use client'

import { useState } from 'react'
import { useTheme } from "next-themes"
import { ProfessionalCard } from "@/components/ProfessionalCard"
import { EventCard } from "@/components/EventCard"
import { Navbar } from '@/components/NavBar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Users, Calendar, Briefcase } from 'lucide-react'
import { useProfessionals } from "@/hooks/useProfessionals"
import { useEvents } from "@/hooks/useEvents"
import Link from 'next/link'
import { Footer } from '@/components/Footer'


export default function Home() {
  const [location, setLocation] = useState("Nueva York")
  const { theme, setTheme } = useTheme()
  const { professionals, loading: loadingProfessionals, error: professionalError } = useProfessionals()
  const { events, loading: loadingEvents, error: eventError } = useEvents()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar location={location} setLocation={setLocation} />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Welcome to NetworkPro
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                Connect with professionals around the world. Expand your network, discover opportunities, and grow your career.
              </p>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="flex-1" placeholder="Search professionals or events" type="text" />
                  <Button type="submit">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Explore NetworkPro
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Find Professionals</CardTitle>
                  <CardDescription>Connect with experts in your field</CardDescription>
                </CardHeader>
                <CardContent>
                  <Users className="h-12 w-12 mb-4 text-blue-500" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Discover and connect with professionals from various industries worldwide.
                  </p>
                  <Link href="/professionals" className="mt-4 inline-block">
                    <Button>Explore Professionals</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Discover Events</CardTitle>
                  <CardDescription>Attend networking opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar className="h-12 w-12 mb-4 text-green-500" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Find and participate in events to expand your network and knowledge.
                  </p>
                  <Link href="/events" className="mt-4 inline-block">
                    <Button variant="outline">Browse Events</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Job Opportunities</CardTitle>
                  <CardDescription>Find your next career move</CardDescription>
                </CardHeader>
                <CardContent>
                  <Briefcase className="h-12 w-12 mb-4 text-purple-500" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Explore job listings and career opportunities in your industry.
                  </p>
                  <Button variant="outline" className="mt-4">Coming Soon</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Featured Professionals
            </h2>
            {professionalError && <div>Error: {professionalError}</div>}
            {loadingProfessionals && <div>Loading professionals...</div>}
            {!loadingProfessionals && professionals.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {professionals.slice(0, 3).map((professional) => (
                  <ProfessionalCard key={professional.id} professional={professional} />
                ))}
              </div>
            )}
            <div className="text-center mt-8">
              <Link href="/professionals">
                <Button>View All Professionals</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Upcoming Events
            </h2>
            {eventError && <div>Error: {eventError}</div>}
            {loadingEvents && <div>Loading events...</div>}
            {!loadingEvents && events.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.slice(0, 3).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
            <div className="text-center mt-8">
              <Link href="/events">
                <Button variant="outline">View All Events</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}