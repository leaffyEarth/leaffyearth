"use client"

import { useLocations } from "@/hooks/use-locations"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export default function LocationsPage() {
  const { locations, isLoading, error } = useLocations()
  const router = useRouter()

  if (isLoading) {
    return <div>Loading...</div>
  } 

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              className="pl-8"
            />
          </div>
        </div>
        <Button onClick={() => router.push("/locations/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <Card key={location._id} className="overflow-hidden cursor-pointer" onClick={() => router.push(`/locations/${location._id}`)}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{location.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex flex-wrap gap-1">
                  {location.pincodes.map((pincode) => (
                    <Badge key={pincode} variant="secondary">
                      {pincode}
                    </Badge>
                  ))}
                </div>
                {location.description && (
                  <p className="mt-2">{location.description}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 