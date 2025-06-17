import { useState, useEffect } from "react"
import { getPartners } from "@/services/partner-service"
import { IPartner, IPartnersResponse } from "@/types/partners"

interface UsePartnersOptions {
  initialPage?: number
  limit?: number
}

interface UsePartnersReturn {
  partners: IPartner[]
  isLoading: boolean
  error: string | null
  page: number
  setPage: (page: number) => void
  totalPages: number
  refresh: () => Promise<void>
}

export function usePartners({ 
  initialPage = 1, 
  limit = 10 
}: UsePartnersOptions = {}): UsePartnersReturn {
  const [partners, setPartners] = useState<IPartner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)

  const fetchPartners = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response: IPartnersResponse = await getPartners(page, limit)
      setPartners(response.data)
      setTotalPages(Math.ceil(response.total / response.limit))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load partners")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPartners()
  }, [page, limit])

  return {
    partners,
    isLoading,
    error,
    page,
    setPage,
    totalPages,
    refresh: fetchPartners
  }
} 