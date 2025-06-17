'use client';

import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import type { ICart, IPlant } from '@/types/shop';

interface ICartStore extends ICart {
  addItem: (plant: IPlant, quantity?: number) => void;
  removeItem: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

// This is the correct type when using the `persist` middleware
// type CartStoreCreator = StateCreator<ICartStore, [], PersistOptions<ICartStore>>;

export const useCart = create<ICartStore>()(
  persist<ICartStore, [], any>(
    (set, get) => ({
      items: [],
      total: 0,
      isSidebarOpen: false,
      openSidebar: () => set({ isSidebarOpen: true }),
      closeSidebar: () => set({ isSidebarOpen: false }),
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
        set((state) => ({
          total: state.items.reduce((sum, item) => sum + item.plant.price * item.quantity, 0)
        }));
      },
      removeItem: (plantId: string) => {
        set((state) => {
          const filteredItems = state.items.filter((item) => item.id !== plantId);
          return {
            items: filteredItems,
            total: filteredItems.reduce((sum, item) => sum + item.plant.price * item.quantity, 0)
          };
        });
      },
      updateQuantity: (plantId: string, quantity: number) => {
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === plantId ? { ...item, quantity } : item
          );
          return {
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + item.plant.price * item.quantity, 0)
          };
        });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
