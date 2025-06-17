import { ILocation } from "../locations";

export interface IPartner {
  _id: string;
  partnerId: string;
  name: string;
  ownerName: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber?: string;
  email?: string;
  region?: string;
  address: string;
  location: ILocation;
  latitude: number;
  longitude: number;
  isActive: boolean;
}

export interface IPartnersResponse {
  data: IPartner[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 