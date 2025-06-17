import type { IPlanter, IPlanterFilters, IPlanterSeries, IPlantersResponse } from '@/types/planter';

class PlanterApi {
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

  async getPlanters(
    page: number = 1,
    limit: number = 12,
    filters?: IPlanterFilters,
    options?: RequestInit,
    idToken?: string
  ): Promise<IPlantersResponse> {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    Object.entries(filters || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.set(key, String(value));
      }
    });

    return this.handleRequest<IPlantersResponse>(
      `${this.baseUrl}/planters?${queryParams.toString()}`,
      options,
      idToken
    );
  }

  async getPlanterIds(idToken?: string): Promise<{ data: string[] }> {
    return this.handleRequest<{ data: string[] }>(`${this.baseUrl}/planters/ids`, undefined, idToken);
  }

  async getPlanterById(id: string, idToken?: string): Promise<IPlanter> {
    return this.handleRequest<IPlanter>(`${this.baseUrl}/planters/${id}`, undefined, idToken);
  }

  async getAllPlanterSeries(options?: RequestInit, idToken?: string): Promise<IPlanterSeries[]> {
    return this.handleRequest<IPlanterSeries[]>(
      `${this.baseUrl}/planters/series`,
      options,
      idToken
    );
  }

  async getPlantersBySeries(series: string, options?: RequestInit, idToken?: string): Promise<IPlanter[]> {
    return this.handleRequest<IPlanter[]>(
      `${this.baseUrl}/planters/getPlantersBySeries?series=${series}`, 
      options,
      idToken
    );
  }
}

export const planterApi = new PlanterApi();
