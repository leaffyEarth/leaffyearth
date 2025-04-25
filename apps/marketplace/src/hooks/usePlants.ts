'use client';

import { useQuery } from '@tanstack/react-query';
import { plantApi } from '@/lib/api/plantApi';
import { mockPlantService } from '@/lib/mockData/plants';
import type { IPlant, IPlantFilters, IPlantsResponse } from '@/types/plant';

// TODO: Replace with real API service when backend is ready
const plantService = mockPlantService;

export function usePlants(page: number = 1, limit: number = 12, filters?: IPlantFilters) {
  const { data, isLoading, error } = useQuery<IPlantsResponse, Error>({
    queryKey: ['plants', page, limit, filters],
    // queryFn: () => plantApi.getPlants(page, limit, filters),  

    // TODO: Replace with real API service when backend is ready
    queryFn: () => plantService.getPlants(page, limit, filters),

  });

  return {
    plants: data?.plants ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? page,
    isLoading,
    error,
  };
}

export function usePlantCategories() {
  return useQuery<string[], Error>({
    queryKey: ['plantCategories'],
    // queryFn: () => plantApi.getPlantCategories(),

    // TODO: Replace with real API service when backend is ready
    queryFn: () => plantService.getPlantCategories(),

  });
}

export function usePlantById(id: string) {
  return useQuery<IPlant, Error>({
    queryKey: ['plant', id],
    // queryFn: () => plantApi.getPlantById(id),
    
    // TODO: Replace with real API service when backend is ready
    queryFn: async () => {
      const plant = await plantService.getPlantById(id);
      if (!plant) {
        throw new Error('Plant not found');
      }
      return plant;
    },
    enabled: !!id,
  });
} 