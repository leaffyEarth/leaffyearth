"use client"

import { EditLocationForm } from "@/components/forms/edit-location-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getLocationById } from "@/services/location-service"
import { ILocation } from "@/types/locations"
import { Loader } from "@/components/ui/loader"

export default function EditLocationPage() {
  const params = useParams()
  const [location, setLocation] = useState<ILocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadLocation() {
      try {
        const data = await getLocationById(params.id as string)
        setLocation(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load location")
      } finally {
        setIsLoading(false)
      }
    }

    loadLocation()
  }, [params.id])

  if (isLoading) {
    return <Loader text="Loading location details..." />
  }

  if (error || !location) {
    return <div>{error || "Location not found"}</div>
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