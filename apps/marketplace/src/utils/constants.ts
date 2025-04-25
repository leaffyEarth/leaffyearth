export const API_ENDPOINTS = {
  PLANTS: '/api/plants',
  CART: '/api/cart',
  ORDERS: '/api/orders',
  AUTH: '/api/auth',
  USERS: '/api/users',
} as const;

export const PLANT_CATEGORIES = [
  'Indoor Plants',
  'Outdoor Plants',
  'Succulents',
  'Cacti',
  'Flowering Plants',
  'Air Plants',
  'Herbs',
] as const;

export const POT_CATEGORIES = [
  'Ceramic',
  'Terracotta',
  'Plastic',
  'Metal',
  'Concrete',
  'Hanging',
] as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export const QUERY_KEYS = {
  PLANTS: 'plants',
  CART: 'cart',
  ORDERS: 'orders',
  USER: 'user',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  CART: 'cart-storage',
  THEME: 'theme',
} as const; 