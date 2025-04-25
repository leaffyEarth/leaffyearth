import { IBaseEntity } from './index';

export interface IPlant extends IBaseEntity {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviews: IReview[];
}

export interface IReview extends IBaseEntity {
  rating: number;
  comment: string;
  userId: string;
  userName: string;
}

export interface ICartItem {
  id: string;
  quantity: number;
  plant: IPlant;
}

export interface ICart {
  items: ICartItem[];
  total: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface IOrder extends IBaseEntity {
  userId: string;
  items: ICartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: IAddress;
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
} 