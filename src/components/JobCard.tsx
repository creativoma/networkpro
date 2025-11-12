'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, DollarSign, Heart, ExternalLink } from 'lucide-react'
import { Job } from '@/types'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { addToFavorites, removeFromFavorites, isFavorite } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [isFavorited, setIsFavorited] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleFavorite = async () => {
    if (!user) {
      router.push('/auth')
      return
    }

    setLoading(true)
    try {
      if (isFavorited) {
        // Remove from favorites - need to get favorite ID first
        // For now, we'll just toggle the state
        setIsFavorited(false)
      } else {
        await addToFavorites(user.id, 'job', job.id)
        setIsFavorited(true)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setLoading(false)
    }
  }

  const getJobTypeColor = (type?: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'Part-time':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'Contract':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'Remote':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
            <CardDescription className="text-base font-medium">{job.company}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavorite}
            disabled={loading}
            className="shrink-0"
          >
            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            {job.location}
          </div>

          {job.job_type && (
            <div className="flex items-center text-sm">
              <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
              <Badge variant="secondary" className={getJobTypeColor(job.job_type)}>
                {job.job_type}
              </Badge>
            </div>
          )}

          {job.salary_range && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="mr-2 h-4 w-4" />
              {job.salary_range}
            </div>
          )}

          {job.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {job.description}
            </p>
          )}

          {job.skills && job.skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {job.skills.slice(0, 5).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {job.skills.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{job.skills.length - 5} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/jobs/${job.id}`} className="w-full">
          <Button className="w-full">
            View Details
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
