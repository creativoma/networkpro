'use client'

import { useState } from 'react'
import { EventCard } from '@/components/EventCard'
import { useEvents } from "@/hooks/useEvents"
import { Navbar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Calendar } from 'lucide-react'

export default function EventsPage() {
  const { events, loading, error } = useEvents()
  const [location, setLocation] = useState("Nueva York")
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "all" || event.location === locationFilter
    return matchesSearch && matchesLocation
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar location={location} setLocation={setLocation} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
        <div className="mb-8 space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
          <div className="w-full md:w-64">
            <Label htmlFor="location">Location</Label>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {Array.from(new Set(events.map(event => event.location))).map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {error && <div className="text-center text-red-500">Error: {error}</div>}
        {loading && <div className="text-center">Loading events...</div>}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center text-gray-500">No events found matching your criteria.</div>
        )}
        {!loading && filteredEvents.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}