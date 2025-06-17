'use client';

import { useQuery } from '@tanstack/react-query';
import { plantApi } from '@/lib/api/plantApi';
import type { IPlant, IPlantFilters, IPlantsResponse } from '@/types/plant';

// TODO: Replace with real API service when backend is ready
interface UsePlantsOptions {
  initialData?: IPlantsResponse;
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
}

export function usePlants(
  page: number, 
  limit: number, 
  filters: IPlantFilters,
  options: UsePlantsOptions = {},
  idToken?: string
) {
  const { data, isLoading, error } = useQuery<IPlantsResponse>({
    queryKey: ['plants', { page, limit, ...filters }],
    queryFn: () => plantApi.getPlants(page, limit, filters, {}, idToken),
    initialData: options.initialData,
    enabled: options.enabled,
    staleTime: options.staleTime,
    gcTime: options.gcTime,
  });

  return {
    plants: data?.data || [],
    total: data?.total || 0,
    totalPages: Math.ceil((data?.total || 0) / limit),
    page,
    isLoading,
    error,
  };
}

// export function usePlantSeries(options: UsePlantsOptions = {}) {
//   const { initialData, enabled = true } = options;

//   const { data, isLoading, error } = useQuery<string[], Error>({
//     queryKey: ['plantSeries'],
//     queryFn: plantApi.getAllPlantSeries,
//     initialData,
//     enabled,
//   });

//   return {
//     series: [],
//     isLoading,
//     error,
//   };
// }

export function usePlantById(id: string) {
  return useQuery<IPlant, Error>({
    queryKey: ['plant', id],
    queryFn: async () => {
      const plant = await plantApi.getPlantById(id);
      if (!plant) {
        throw new Error('Plant not found');
      }
      return plant;
    },
    enabled: !!id,
  });
} 