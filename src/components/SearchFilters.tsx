import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Search } from 'lucide-react'

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  industryFilter: string;
  setIndustryFilter: (industry: string) => void;
  experienceFilter: number[];
  setExperienceFilter: (range: number[]) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  showRecommended: boolean;
  setShowRecommended: (show: boolean) => void;
}

export function SearchFilters({
  searchTerm,
  setSearchTerm,
  industryFilter,
  setIndustryFilter,
  experienceFilter,
  setExperienceFilter,
  statusFilter,
  setStatusFilter,
  showRecommended,
  setShowRecommended
}: SearchFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Buscar por profesión, empresa o nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button>
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="industry">Industria</Label>
          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger id="industry">
              <SelectValue placeholder="Seleccionar industria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="Tecnología">Tecnología</SelectItem>
              <SelectItem value="Diseño">Diseño</SelectItem>
              <SelectItem value="Consultoría">Consultoría</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="experience">Años de experiencia</Label>
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
            <span>{experienceFilter[0]} años</span>
            <span>{experienceFilter[1]} años</span>
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <Label htmlFor="status">Estado</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="openToWork">Buscando trabajo</SelectItem>
              <SelectItem value="hiring">Contratando</SelectItem>
              <SelectItem value="open">Abierto a oportunidades</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="recommended"
          checked={showRecommended}
          onCheckedChange={setShowRecommended}
        />
        <Label htmlFor="recommended">Mostrar recomendados</Label>
      </div>
    </div>
  )
}