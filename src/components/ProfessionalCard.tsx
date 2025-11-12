'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Professional } from '@/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Heart, MessageSquare, UserPlus, UserCheck, Clock, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import {
  sendConnectionRequest,
  getConnectionStatus,
  addToFavorites,
  removeFromFavorites,
  getFavorites
} from '@/lib/api'
import { toast } from 'sonner'

interface ProfessionalCardProps {
  professional: Professional
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
  const { user } = useAuth()
  const router = useRouter()

  // State management
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending' | 'connected'>('none')
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoriteId, setFavoriteId] = useState<string | null>(null)
  const [loadingConnection, setLoadingConnection] = useState(false)
  const [loadingFavorite, setLoadingFavorite] = useState(false)

  // Check connection status and favorite status on mount
  useEffect(() => {
    if (user && professional.user_id && user.id !== professional.user_id) {
      checkConnectionStatus()
      checkFavoriteStatus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, professional.user_id])

  const checkConnectionStatus = async () => {
    if (!user || !professional.user_id) return

    try {
      const connection = await getConnectionStatus(user.id, professional.user_id)
      if (connection) {
        setConnectionStatus(connection.status === 'accepted' ? 'connected' : 'pending')
      }
    } catch (error) {
      console.error('Error checking connection status:', error)
    }
  }

  const checkFavoriteStatus = async () => {
    if (!user) return

    try {
      const favorites = await getFavorites(user.id)
      const favorite = favorites.find(f => f.professional_id === professional.id)
      if (favorite) {
        setIsFavorited(true)
        setFavoriteId(favorite.id)
      }
    } catch (error) {
      console.error('Error checking favorite status:', error)
    }
  }

  const handleConnect = async () => {
    if (!user) {
      toast.error('Please sign in to connect with professionals')
      return
    }

    if (!professional.user_id) {
      toast.error('Unable to connect with this professional')
      return
    }

    if (user.id === professional.user_id) {
      toast.error('You cannot connect with yourself')
      return
    }

    setLoadingConnection(true)
    try {
      await sendConnectionRequest(user.id, professional.user_id)
      setConnectionStatus('pending')
      toast.success(`Connection request sent to ${professional.name}`)
    } catch (error) {
      console.error('Error sending connection request:', error)
      toast.error('Failed to send connection request')
    } finally {
      setLoadingConnection(false)
    }
  }

  const handleMessage = () => {
    if (!user) {
      toast.error('Please sign in to send messages')
      return
    }

    if (!professional.user_id) {
      toast.error('Unable to message this professional')
      return
    }

    if (user.id === professional.user_id) {
      toast.error('You cannot message yourself')
      return
    }

    // Navigate to messages page with the professional's user_id
    router.push(`/messages?user=${professional.user_id}`)
  }

  const handleFavorite = async () => {
    if (!user) {
      toast.error('Please sign in to save favorites')
      return
    }

    setLoadingFavorite(true)
    try {
      if (isFavorited && favoriteId) {
        await removeFromFavorites(favoriteId)
        setIsFavorited(false)
        setFavoriteId(null)
        toast.success('Removed from favorites')
      } else {
        const favorite = await addToFavorites(user.id, 'professional', professional.id)
        setIsFavorited(true)
        setFavoriteId(favorite.id)
        toast.success(`${professional.name} added to favorites`)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error('Failed to update favorites')
    } finally {
      setLoadingFavorite(false)
    }
  }

  // Connection button rendering
  const renderConnectionButton = () => {
    if (!user || user.id === professional.user_id) {
      return null // Don't show button for own profile
    }

    if (loadingConnection) {
      return (
        <Button variant="ghost" size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      )
    }

    switch (connectionStatus) {
      case 'connected':
        return (
          <Button variant="ghost" size="icon" disabled title="Connected">
            <UserCheck className="h-4 w-4 text-green-500" />
          </Button>
        )
      case 'pending':
        return (
          <Button variant="ghost" size="icon" disabled title="Request Pending">
            <Clock className="h-4 w-4 text-yellow-500" />
          </Button>
        )
      default:
        return (
          <Button variant="ghost" size="icon" onClick={handleConnect} title="Connect">
            <UserPlus className="h-4 w-4" />
          </Button>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={professional.avatar} alt={professional.name} />
            <AvatarFallback>{professional.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{professional.name}</CardTitle>
            <CardDescription>{professional.profession}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {professional.company && <p className="text-sm font-medium mb-1">{professional.company}</p>}
        {professional.description && <p className="text-sm text-muted-foreground mb-2">{professional.description}</p>}
        {professional.location && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {professional.location}
          </div>
        )}
        {professional.skills && professional.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {professional.skills.map((skill, index) => (
              <Badge key={index} variant="outline">{skill}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {renderConnectionButton()}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMessage}
          disabled={!user || user.id === professional.user_id}
          title="Send Message"
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFavorite}
          disabled={loadingFavorite || !user}
          title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        >
          {loadingFavorite ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
