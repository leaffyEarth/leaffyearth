export interface ILocation {
  _id: string;
  name: string;
  address: string;
  pincodes: string[];
  description?: string;
}


export interface ILocationsResponse {
  data: ILocation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 