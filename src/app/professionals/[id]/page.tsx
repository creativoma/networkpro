'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { MapPin, Briefcase, GraduationCap, Award, Languages, Heart, MessageSquare, UserPlus, ArrowLeft } from 'lucide-react'
import { Professional } from '@/types'
import { getProfessionalById, sendConnectionRequest, addToFavorites, sendMessage } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

export default function ProfessionalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfessional() {
      if (params.id) {
        const data = await getProfessionalById(params.id as string)
        setProfessional(data)
        setLoading(false)
      }
    }
    fetchProfessional()
  }, [params.id])

  const handleConnect = async () => {
    if (!user) {
      router.push('/auth')
      return
    }
    setActionLoading('connect')
    try {
      if (professional?.user_id) {
        await sendConnectionRequest(user.id, professional.user_id)
        alert('Connection request sent!')
      }
    } catch (error) {
      console.error('Error sending connection request:', error)
      alert('Failed to send connection request')
    } finally {
      setActionLoading(null)
    }
  }

  const handleMessage = () => {
    if (!user) {
      router.push('/auth')
      return
    }
    // Navigate to messages page with this professional
    router.push(`/messages?user=${professional?.user_id}`)
  }

  const handleFavorite = async () => {
    if (!user) {
      router.push('/auth')
      return
    }
    setActionLoading('favorite')
    try {
      if (professional?.id) {
        await addToFavorites(user.id, 'professional', professional.id)
        alert('Added to favorites!')
      }
    } catch (error) {
      console.error('Error adding to favorites:', error)
      alert('Failed to add to favorites')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar location="San Francisco" setLocation={() => {}} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading professional...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!professional) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar location="San Francisco" setLocation={() => {}} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Professional not found</h2>
            <Button onClick={() => router.push('/professionals')}>
              Back to Professionals
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar location={professional.location || 'San Francisco'} setLocation={() => {}} />

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
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={professional.avatar} alt={professional.name} />
                    <AvatarFallback className="text-2xl">
                      {professional.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold text-center mb-2">{professional.name}</h1>
                  <p className="text-lg text-muted-foreground text-center mb-1">{professional.profession}</p>
                  {professional.company && (
                    <p className="text-sm text-muted-foreground text-center mb-4">{professional.company}</p>
                  )}

                  {professional.status && (
                    <Badge
                      variant="secondary"
                      className={
                        professional.status === 'available'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : professional.status === 'busy'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      }
                    >
                      {professional.status.replace('_', ' ')}
                    </Badge>
                  )}

                  <Separator className="my-6" />

                  {/* Action Buttons */}
                  <div className="w-full space-y-2">
                    <Button
                      className="w-full"
                      onClick={handleConnect}
                      disabled={actionLoading === 'connect'}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      {actionLoading === 'connect' ? 'Connecting...' : 'Connect'}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleMessage}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleFavorite}
                      disabled={actionLoading === 'favorite'}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      {actionLoading === 'favorite' ? 'Adding...' : 'Save'}
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  {/* Quick Info */}
                  <div className="w-full space-y-3">
                    {professional.location && (
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{professional.location}</span>
                      </div>
                    )}
                    {professional.experience && (
                      <div className="flex items-center text-sm">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{professional.experience} years experience</span>
                      </div>
                    )}
                    {professional.industry && (
                      <div className="flex items-center text-sm">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{professional.industry}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            {professional.description && (
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{professional.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {professional.skills && professional.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {professional.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {professional.education && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{professional.education}</p>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {professional.certifications && professional.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {professional.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span className="text-muted-foreground">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Languages */}
            {professional.languages && professional.languages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Languages className="mr-2 h-5 w-5" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {professional.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
