"use client"

import { EditLocationForm } from "@/components/forms/edit-location-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ILocation } from "@/types/locations"

export default function EditLocationPage() {
  const params = useParams()
  const [location, setLocation] = useState<ILocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch(`/api/locations/${params.id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch location")
        }
        const data = await response.json()
        setLocation(data)
      } catch (error) {
        console.error("Error fetching location:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocation()
  }, [params.id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!location) {
    return <div>Location not found</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/locations">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Locations
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Edit Location</h1>
        <p className="text-muted-foreground">
          Update location information
        </p>
      </div>
      <div className="rounded-lg border bg-card p-8">
        <EditLocationForm location={location} />
      </div>
    </div>
  )
} 