'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { User as UserIcon, Briefcase, Heart, Calendar, MessageSquare, Users, Save } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getUserProfile, updateUserProfile, createUserProfile, getFavorites, getEventRegistrations, getConnections } from '@/lib/api'
import { User, Favorite, EventRegistration, Connection } from '@/types'

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [registrations, setRegistrations] = useState<EventRegistration[]>([])
  const [connections, setConnections] = useState<Connection[]>([])

  // Form state
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [company, setCompany] = useState('')
  const [profession, setProfession] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    async function loadProfile() {
      if (user) {
        const profile = await getUserProfile(user.id)
        setUserProfile(profile)

        if (profile) {
          setName(profile.name || '')
          setBio(profile.bio || '')
          setLocation(profile.location || '')
          setCompany(profile.company || '')
          setProfession(profile.profession || '')
        }

        // Load user data
        const userFavorites = await getFavorites(user.id)
        setFavorites(userFavorites)

        const userRegistrations = await getEventRegistrations(user.id)
        setRegistrations(userRegistrations)

        const userConnections = await getConnections(user.id)
        setConnections(userConnections)

        setLoading(false)
      }
    }
    loadProfile()
  }, [user])

  const handleSaveProfile = async () => {
    if (!user) return

    setSaving(true)
    try {
      const updates: Partial<User> = {
        name,
        bio,
        location,
        company,
        profession
      }

      if (userProfile) {
        await updateUserProfile(user.id, updates)
      } else {
        await createUserProfile({
          id: user.id,
          email: user.email!,
          ...updates
        })
      }

      alert('Profile updated successfully!')
      const updated = await getUserProfile(user.id)
      setUserProfile(updated)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar location="San Francisco" setLocation={() => {}} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar location={location || 'San Francisco'} setLocation={() => {}} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={name || user.email!} />
                    <AvatarFallback className="text-2xl">
                      {(name || user.email || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-center mb-1">{name || 'No name set'}</h2>
                  <p className="text-sm text-muted-foreground text-center mb-2">{user.email}</p>
                  {profession && (
                    <Badge variant="secondary" className="mb-4">{profession}</Badge>
                  )}

                  <Separator className="my-4 w-full" />

                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Connections</span>
                      <span className="font-medium">{connections.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Events</span>
                      <span className="font-medium">{registrations.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Favorites</span>
                      <span className="font-medium">{favorites.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar className="mr-2 h-4 w-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="connections">
                  <Users className="mr-2 h-4 w-4" />
                  Connections
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user.email || ''}
                        disabled
                        className="bg-muted"
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profession">Profession</Label>
                      <Input
                        id="profession"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        placeholder="e.g. Software Engineer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Your current company"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Your city"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself"
                        className="w-full min-h-[100px] px-3 py-2 text-sm rounded-md border border-input bg-background"
                      />
                    </div>

                    <Button onClick={handleSaveProfile} disabled={saving}>
                      <Save className="mr-2 h-4 w-4" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Items</CardTitle>
                    <CardDescription>
                      {favorites.length} item{favorites.length !== 1 ? 's' : ''} saved
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {favorites.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Heart className="mx-auto h-12 w-12 mb-4 opacity-20" />
                        <p>No favorites yet</p>
                        <p className="text-sm mt-2">Start saving professionals, jobs, and events!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {favorites.map((fav) => (
                          <div key={fav.id} className="border rounded-lg p-4">
                            <p className="text-sm text-muted-foreground">
                              {fav.professional_id && 'Professional'}
                              {fav.job_id && 'Job'}
                              {fav.event_id && 'Event'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Saved on {new Date(fav.created_at!).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <CardTitle>My Events</CardTitle>
                    <CardDescription>
                      {registrations.length} event{registrations.length !== 1 ? 's' : ''} registered
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {registrations.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Calendar className="mx-auto h-12 w-12 mb-4 opacity-20" />
                        <p>No events registered</p>
                        <p className="text-sm mt-2">Browse events and register to attend!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {registrations.map((reg) => (
                          <div key={reg.id} className="border rounded-lg p-4">
                            <Badge variant={reg.status === 'registered' ? 'default' : 'secondary'}>
                              {reg.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-2">
                              Registered on {new Date(reg.registered_at!).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Connections Tab */}
              <TabsContent value="connections">
                <Card>
                  <CardHeader>
                    <CardTitle>My Connections</CardTitle>
                    <CardDescription>
                      {connections.length} connection{connections.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {connections.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Users className="mx-auto h-12 w-12 mb-4 opacity-20" />
                        <p>No connections yet</p>
                        <p className="text-sm mt-2">Start connecting with professionals!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {connections.map((conn) => (
                          <div key={conn.id} className="border rounded-lg p-4">
                            <Badge variant="secondary">{conn.status}</Badge>
                            <p className="text-xs text-muted-foreground mt-2">
                              Connected on {new Date(conn.created_at!).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
