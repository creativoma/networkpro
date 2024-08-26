'use client'

import { useState } from 'react'
import { ProfessionalCard } from "@/components/ProfessionalCard"
import { useProfessionals } from "@/hooks/useProfessionals"
import { Navbar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, Filter } from 'lucide-react'

export default function ProfessionalsPage() {
  const { professionals, loading, error } = useProfessionals()
  const [location, setLocation] = useState("Nueva York")
  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState([0, 20])

  const filteredProfessionals = professionals.filter(pro => {
    const matchesSearch = pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pro.profession.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = industryFilter === "all" || pro.industry === industryFilter
    const matchesExperience = pro.experience !== undefined && pro.experience >= experienceFilter[0] && pro.experience <= experienceFilter[1]
    return matchesSearch && matchesIndustry && matchesExperience
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar location={location} setLocation={setLocation} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Professionals</h1>
        <div className="mb-8 space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search by name or profession"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto">
              <Label htmlFor="industry">Industry</Label>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  {/* Add more industries as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-auto flex-grow">
              <Label htmlFor="experience">Years of Experience</Label>
              <Slider
                id="experience"
                min={0}
                max={20}
                step={1}
                value={experienceFilter}
                onValueChange={setExperienceFilter}
                className="mt-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>{experienceFilter[0]} years</span>
                <span>{experienceFilter[1]} years</span>
              </div>
            </div>
          </div>
        </div>
        {error && <div className="text-center text-red-500">Error: {error}</div>}
        {loading && <div className="text-center">Loading professionals...</div>}
        {!loading && filteredProfessionals.length === 0 && (
          <div className="text-center text-gray-500">No professionals found matching your criteria.</div>
        )}
        {!loading && filteredProfessionals.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}