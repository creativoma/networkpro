import { Professional } from '@/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Heart, MessageSquare, Users } from 'lucide-react'

interface ProfessionalCardProps {
  professional: Professional
}

export function ProfessionalCard({ professional }: ProfessionalCardProps) {
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
        {/* Añade comprobaciones similares para otras propiedades opcionales */}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="icon">
          <Users className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}