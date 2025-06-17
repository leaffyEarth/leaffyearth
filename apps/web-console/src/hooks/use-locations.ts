import { useState, useEffect } from "react"
import { getLocations } from "@/services/location-service"
import { ILocation, ILocationsResponse } from "@/types/locations"

interface UseLocationsOptions {
  initialPage?: number
  limit?: number
}

interface UseLocationsReturn {
  locations: ILocation[]
  isLoading: boolean
  error: string | null
  page: number
  setPage: (page: number) => void
  totalPages: number
  refresh: () => Promise<void>
}

export function useLocations({ 
  initialPage = 1, 
  limit = 10 
}: UseLocationsOptions = {}): UseLocationsReturn {
  const [locations, setLocations] = useState<ILocation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)

  const fetchLocations = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response: ILocationsResponse = await getLocations(page, limit)
      setLocations(response.data)
      setTotalPages(Math.ceil(response.total / response.limit))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load locations")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLocations()
  }, [page, limit])

  return {
    locations,
    isLoading,
    error,
    page,
    setPage,
    totalPages,
    refresh: fetchLocations
  }
} 