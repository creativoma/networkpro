'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'
import { Navbar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { Event } from '@/types'
import { getEventById, registerForEvent, cancelEventRegistration, isUserRegisteredForEvent } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'
import { copyToClipboard, getTwitterShareUrl, getLinkedInShareUrl } from '@/lib/share-utils'
import { formatDateTime } from '@/lib/date-utils'

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRegistered, setIsRegistered] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    async function fetchEvent() {
      if (params.id) {
        const data = await getEventById(params.id as string)
        setEvent(data)

        if (user && data) {
          const registered = await isUserRegisteredForEvent(data.id, user.id)
          setIsRegistered(registered)
        }

        setLoading(false)
      }
    }
    fetchEvent()
  }, [params.id, user])

  const handleRegister = async () => {
    if (!user) {
      router.push('/auth')
      return
    }

    setActionLoading(true)
    try {
      if (event) {
        if (isRegistered) {
          await cancelEventRegistration(event.id, user.id)
          setIsRegistered(false)
          toast.success('Registration cancelled successfully!')
        } else {
          await registerForEvent(event.id, user.id)
          setIsRegistered(true)
          toast.success('Registered successfully!')
        }
      }
    } catch (error) {
      console.error('Error toggling registration:', error)
      toast.error('Failed to update registration')
    } finally {
      setActionLoading(false)
    }
  }

  const handleShareTwitter = () => {
    if (!event) return
    const url = getTwitterShareUrl(
      `Check out this event: ${event.name}`,
      window.location.href
    )
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleShareLinkedIn = () => {
    if (!event) return
    const url = getLinkedInShareUrl(window.location.href)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCopyLink = async () => {
    const success = await copyToClipboard(window.location.href)
    if (success) {
      toast.success('Link copied to clipboard!')
    } else {
      toast.error('Failed to copy link')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar location="San Francisco" setLocation={() => {}} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading event...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar location="San Francisco" setLocation={() => {}} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Event not found</h2>
            <Button onClick={() => router.push('/events')}>
              Back to Events
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar location={event.location || 'San Francisco'} setLocation={() => {}} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Image and Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                {event.image && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.name}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {isRegistered && (
                  <Badge className="w-full mb-4 justify-center py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    You&apos;re Registered
                  </Badge>
                )}

                <Button
                  className="w-full"
                  onClick={handleRegister}
                  disabled={actionLoading}
                  variant={isRegistered ? 'destructive' : 'default'}
                >
                  {actionLoading ? (
                    'Processing...'
                  ) : isRegistered ? (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel Registration
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Register for Event
                    </>
                  )}
                </Button>

                <Separator className="my-6" />

                {/* Event Info */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Date & Time</p>
                      <p className="text-sm text-muted-foreground">{formatDateTime(event.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Location</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </div>

                  {event.category && (
                    <div>
                      <p className="font-medium text-sm mb-2">Category</p>
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                  )}

                  {event.max_attendees && (
                    <div className="flex items-start">
                      <Users className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Capacity</p>
                        <p className="text-sm text-muted-foreground">Up to {event.max_attendees} attendees</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Event Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{event.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {event.description && (
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-xl font-semibold mb-3">About This Event</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
                  </div>
                )}

                {!event.description && (
                  <p className="text-muted-foreground">No description available for this event.</p>
                )}

                <Separator className="my-6" />

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What to Bring</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Valid ID for entry</li>
                    <li>Business cards for networking</li>
                    <li>Notebook and pen</li>
                  </ul>
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-semibold mb-3">Share This Event</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleShareTwitter}>Share on Twitter</Button>
                    <Button variant="outline" size="sm" onClick={handleShareLinkedIn}>Share on LinkedIn</Button>
                    <Button variant="outline" size="sm" onClick={handleCopyLink}>Copy Link</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
