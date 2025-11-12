'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { JobCard } from '@/components/JobCard'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Briefcase } from 'lucide-react'
import { useJobs } from '@/hooks/useJobs'

export default function JobsPage() {
  const [location, setLocation] = useState('San Francisco')
  const [searchQuery, setSearchQuery] = useState('')
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('all')
  const [locationFilter, setLocationFilter] = useState<string>('all')

  const { jobs, loading, error } = useJobs()

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesJobType = jobTypeFilter === 'all' || job.job_type === jobTypeFilter
      const matchesLocation = locationFilter === 'all' || job.location.toLowerCase().includes(locationFilter.toLowerCase())

      return matchesSearch && matchesJobType && matchesLocation
    })
  }, [jobs, searchQuery, jobTypeFilter, locationFilter])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar location={location} setLocation={setLocation} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Briefcase className="mr-3 h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Job Opportunities</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Discover exciting career opportunities from top companies around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="md:col-span-1">
              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="Tokyo">Tokyo</SelectItem>
                  <SelectItem value="Paris">Paris</SelectItem>
                  <SelectItem value="Berlin">Berlin</SelectItem>
                  <SelectItem value="Singapore">Singapore</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(searchQuery || jobTypeFilter !== 'all' || locationFilter !== 'all') && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setJobTypeFilter('all')
                  setLocationFilter('all')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading jobs...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && (
          <>
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || jobTypeFilter !== 'all' || locationFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Check back later for new opportunities'}
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
