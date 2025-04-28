'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ICart, ICartItem, IPlant } from '@/types/shop';

interface ICartStore extends ICart {
  addItem: (plant: IPlant, quantity?: number) => void;
  removeItem: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<ICartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (plant: IPlant, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === plant.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === plant.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({ 
            items: [...items, { id: plant.id, plant, quantity }],
          });
        }
        // Recalculate total
        set((state) => ({
          total: state.items.reduce((sum, item) => sum + item.plant.price * item.quantity, 0)
        }));
      },
      removeItem: (plantId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== plantId),
          total: state.items
            .filter((item) => item.id !== plantId)
            .reduce((sum, item) => sum + item.plant.price * item.quantity, 0)
        }));
      },
      updateQuantity: (plantId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === plantId ? { ...item, quantity } : item
          ),
          total: state.items
            .map((item) => item.id === plantId ? { ...item, quantity } : item)
            .reduce((sum, item) => sum + item.plant.price * item.quantity, 0)
        }));
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
); 