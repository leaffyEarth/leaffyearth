import type { IPlant, IPlantFilters, IPlantsResponse } from '@/types/plant';

class PlantApi {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  }

  private async handleRequest<T>(url: string, options?: RequestInit, idToken?: string): Promise<T> {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken && { 'Cookie': `token=${idToken}` }),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  // async getPlants(
  //   page: number = 1,
  //   limit: number = 12,
  //   filters?: IPlantFilters,
  //   options?: RequestInit
  // ): Promise<IPlantsResponse> {
  //   const queryParams = new URLSearchParams({
  //     page: page.toString(),
  //     limit: limit.toString(),
  //     ...(filters?.plantSeries && { plantSeries: filters.plantSeries }),
  //     ...(filters?.minPrice && { minPrice: filters.minPrice.toString() }),
  //     ...(filters?.maxPrice && { maxPrice: filters.maxPrice.toString() }),
  //     ...(filters?.sortBy && { sortBy: filters.sortBy }),
  //   });

  //   return this.handleRequest<IPlantsResponse>(
  //     `${this.baseUrl}/plants?${queryParams.toString()}`,
  //     options
  //   );
  // }

  async getPlants(
    page: number = 1,
    limit: number = 12,
    filters?: IPlantFilters,
    options?: RequestInit,
    idToken?: string
  ): Promise<IPlantsResponse> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    Object.entries(filters || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.set(key, String(value));
      }
    });

    return this.handleRequest<IPlantsResponse>(
      `${this.baseUrl}/plants?${queryParams.toString()}`,
      options,
      idToken
    );
  }

  async getPlantIds(idToken?: string): Promise<{ data: string[] }> {
    return this.handleRequest<{ data: string[] }>(`${this.baseUrl}/plants/ids`, undefined, idToken);
  }

  async getPlantById(id: string, idToken?: string): Promise<IPlant> {
    return this.handleRequest<IPlant>(`${this.baseUrl}/plants/${id}`, undefined, idToken);
  }

  async getAllPlantSeries(options?: RequestInit, idToken?: string): Promise<{ data: string[] }> {
    return this.handleRequest<{ data: string[] }>(
      `${this.baseUrl}/plants/getAllSeries`,
      options,
      idToken
    );
  }

  async getPlantsBySeries(series: string, options?: RequestInit, idToken?: string): Promise<{ data: IPlant[] }> {
    return this.handleRequest<{ data: IPlant[] }>(
      `${this.baseUrl}/plants/getPlantBySeries?series=${series}`, 
      options,
      idToken
    );
  }
}

export const plantApi = new PlantApi(); 