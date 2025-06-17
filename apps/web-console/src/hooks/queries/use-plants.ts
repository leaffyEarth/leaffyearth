import { useQuery } from '@tanstack/react-query'
import { getPlants } from '@/services/plant-service'
import { IPlantsResponse } from '@/types/plants'

export const PLANTS_QUERY_KEY = ['plants'] as const

interface IUsePlantsOptions {
  page?: number
  limit?: number
  enabled?: boolean
}

export function usePlants({ 
  page = 1, 
  limit = 15,
  enabled = true 
}: IUsePlantsOptions = {}) {
  const query = useQuery<IPlantsResponse, Error>({
    queryKey: [...PLANTS_QUERY_KEY, { page, limit }],
    queryFn: () => getPlants(page, limit),
    enabled,
    placeholderData: {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0
    },
    retry: 1,
    staleTime: 1000 * 60, // 1 minute
  })

  // Debug logging
  console.log('Plants query state:', {
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    data: query.data,
    isFetching: query.isFetching
  });

  return query
} 