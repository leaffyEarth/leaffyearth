'use client';

import { useQuery } from '@tanstack/react-query';
import { planterApi } from '@/lib/api/planterApi';
import type { IPlanter, IPlanterFilters, IPlantersResponse } from '@/types/planter';

interface UsePlantersOptions {
  initialData?: IPlantersResponse;
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
}

export function usePlanters(
  page: number, 
  limit: number, 
  filters: IPlanterFilters,
  options: UsePlantersOptions = {},
  idToken?: string
) {
  const { data, isLoading, error } = useQuery<IPlantersResponse>({
    queryKey: ['planters', { page, limit, ...filters }],
    queryFn: () => planterApi.getPlanters(page, limit, filters, {}, idToken),
    initialData: options.initialData,
    enabled: options.enabled,
    staleTime: options.staleTime,
    gcTime: options.gcTime,
  });

  return {
    planters: data?.data || [],
    total: data?.total || 0,
    totalPages: Math.ceil((data?.total || 0) / limit),
    page,
    isLoading,
    error,
  };
}

export function usePlanterById(id: string) {
  return useQuery<IPlanter, Error>({
    queryKey: ['planter', id],
    queryFn: async () => {
      const planter = await planterApi.getPlanterById(id);
      if (!planter) {
        throw new Error('Planter not found');
      }
      return planter;
    },
    enabled: !!id,
  });
} 