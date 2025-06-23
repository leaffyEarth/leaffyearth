// Common shared types across the application
export interface IBaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISeoMeta {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface IApiResponse<T> {
  data: T;
  message?: string;
  status: number;
} 