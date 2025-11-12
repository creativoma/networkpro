'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MapPin, Briefcase, DollarSign, Calendar, Heart, Send, ArrowLeft, Building2 } from 'lucide-react'
import { Job } from '@/types'
import { getJobById, addToFavorites, isFavorite } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    async function fetchJob() {
      if (params.id) {
        const data = await getJobById(params.id as string)
        setJob(data)

        if (user && data) {
          const favorited = await isFavorite(user.id, 'job', data.id)
          setIsFavorited(favorited)
        }

        setLoading(false)
      }
    }
    fetchJob()
  }, [params.id, user])

  const handleFavorite = async () => {
    if (!user) {
      router.push('/auth')
      return
    }

    setActionLoading(true)
    try {
      if (job && !isFavorited) {
        await addToFavorites(user.id, 'job', job.id)
        setIsFavorited(true)
        alert('Added to favorites!')
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      alert('Failed to add to favorites')
    } finally {
      setActionLoading(false)
    }
  }

  const handleApply = () => {
    if (!user) {
      router.push('/auth')
      return
    }
    // In a real app, this would open an application form or redirect to external application
    alert('Application functionality would be implemented here!')
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently posted'
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Posted today'
    if (diffDays === 1) return 'Posted yesterday'
    if (diffDays < 7) return `Posted ${diffDays} days ago`
    if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} weeks ago`
    return `Posted ${Math.floor(diffDays / 30)} months ago`
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar location="San Francisco" setLocation={() => {}} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading job...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar location="San Francisco" setLocation={() => {}} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Job not found</h2>
            <Button onClick={() => router.push('/jobs')}>
              Back to Jobs
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar location={job.location || 'San Francisco'} setLocation={() => {}} />

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
          {/* Left Column - Job Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>

                <h2 className="text-2xl font-bold mb-2">{job.company}</h2>
                <p className="text-muted-foreground mb-4">{formatDate(job.posted_at)}</p>

                <div className="flex gap-2 mb-6">
                  <Button
                    className="flex-1"
                    onClick={handleApply}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleFavorite}
                    disabled={actionLoading || isFavorited}
                  >
                    <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>

                <Separator className="my-6" />

                {/* Job Details */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Location</p>
                      <p className="text-sm text-muted-foreground">{job.location}</p>
                    </div>
                  </div>

                  {job.job_type && (
                    <div className="flex items-start">
                      <Briefcase className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Job Type</p>
                        <Badge variant="secondary" className={`mt-1 ${getJobTypeColor(job.job_type)}`}>
                          {job.job_type}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {job.salary_range && (
                    <div className="flex items-start">
                      <DollarSign className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Salary Range</p>
                        <p className="text-sm text-muted-foreground">{job.salary_range}</p>
                      </div>
                    </div>
                  )}

                  {job.expires_at && (
                    <div className="flex items-start">
                      <Calendar className="mr-3 h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Application Deadline</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(job.expires_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Share */}
                <div>
                  <p className="font-medium text-sm mb-3">Share This Job</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">LinkedIn</Button>
                    <Button variant="outline" size="sm">Twitter</Button>
                    <Button variant="outline" size="sm">Copy</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Title and Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {job.description && (
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-xl font-semibold mb-3">About This Role</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{job.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Required Skills */}
            {job.skills && job.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Call to Action */}
            <Card className="bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Interested in this role?</h3>
                  <p className="text-muted-foreground mb-4">
                    Apply now and take the next step in your career journey
                  </p>
                  <Button size="lg" onClick={handleApply}>
                    <Send className="mr-2 h-4 w-4" />
                    Apply for this Position
                  </Button>
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
