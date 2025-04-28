import type { IPlant, IPlantFilters, IPlantsResponse } from '@/types/plant';

class PlantApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }

  private async handleRequest<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getPlants(
    page: number = 1,
    limit: number = 12,
    filters?: IPlantFilters
  ): Promise<IPlantsResponse> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(filters?.category && { category: filters.category }),
      ...(filters?.minPrice && { minPrice: filters.minPrice.toString() }),
      ...(filters?.maxPrice && { maxPrice: filters.maxPrice.toString() }),
      ...(filters?.sortBy && { sortBy: filters.sortBy }),
    });

    return this.handleRequest<IPlantsResponse>(
      `${this.baseUrl}/plants?${queryParams.toString()}`
    );
  }

  async getPlantById(id: string): Promise<IPlant> {
    return this.handleRequest<IPlant>(`${this.baseUrl}/plants/${id}`);
  }

  async getPlantCategories(): Promise<string[]> {
    return this.handleRequest<string[]>(`${this.baseUrl}/plants/categories`);
  }
}

export const plantApi = new PlantApi(); 