import { useState, useEffect } from "react"
import { getPlanters } from "@/services/planter-service"
import { IPlanter } from "@/types/planters"

interface UsePlantersOptions {
  initialPage?: number
  limit?: number
}

interface UsePlantersReturn {
  planters: IPlanter[]
  isLoading: boolean
  error: string | null
  page: number
  setPage: (page: number) => void
  totalPages: number
  refresh: () => Promise<void>
}

export function usePlanters({ 
  initialPage = 1, 
  limit = 10 
}: UsePlantersOptions = {}): UsePlantersReturn {
  const [planters, setPlanters] = useState<IPlanter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)

  const fetchPlanters = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getPlanters(page, limit)
      setPlanters(response.data)
      setTotalPages(Math.ceil(response.total / response.limit))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load planters")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlanters()
  }, [page, limit])

  return {
    planters,
    isLoading,
    error,
    page,
    setPage,
    totalPages,
    refresh: fetchPlanters
  }
} 