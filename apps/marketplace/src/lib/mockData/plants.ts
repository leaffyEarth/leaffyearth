import type { IPlant, IPlantFilters, IPlantsResponse } from '@/types/plant';

const mockPlants: IPlant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    description: 'Large, split-leaf philodendron with stunning foliage',
    price: 3999,
    discountedPrice: 3199,
    imageUrl: '/images/plants/monstera.jpg',
    category: 'Indoor Plants',
    rating: 4.8,
    reviews: 128,
    stock: 15,
    offer: {
      label: '20% OFF',
      type: 'percentage',
      value: 20
    }
  },
  {
    id: '2',
    name: 'Fiddle Leaf Fig',
    description: 'Popular indoor tree with large, violin-shaped leaves',
    price: 5999,
    imageUrl: '/images/plants/fiddle-leaf.jpg',
    category: 'Indoor Plants',
    rating: 4.6,
    reviews: 95,
    stock: 8
  },
  {
    id: '3',
    name: 'Snake Plant',
    description: 'Low-maintenance plant with upright, sword-like leaves',
    price: 2499,
    imageUrl: '/images/plants/snake-plant.jpg',
    category: 'Indoor Plants',
    rating: 4.7,
    reviews: 156,
    stock: 20
  },
  {
    id: '4',
    name: 'Peace Lily',
    description: 'Elegant plant with white flowers and dark green leaves',
    price: 2999,
    imageUrl: '/images/plants/peace-lily.jpg',
    category: 'Indoor Plants',
    rating: 4.5,
    reviews: 89,
    stock: 12
  },
  {
    id: '5',
    name: 'ZZ Plant',
    description: 'Drought-tolerant plant with glossy, dark green leaves',
    price: 3499,
    discountedPrice: 2999,
    imageUrl: '/images/plants/zz-plant.jpg',
    category: 'Indoor Plants',
    rating: 4.9,
    reviews: 112,
    stock: 18,
    offer: {
      label: '15% OFF',
      type: 'percentage',
      value: 15
    }
  },
  {
    id: '6',
    name: 'Pothos',
    description: 'Trailing vine plant with heart-shaped leaves',
    price: 1999,
    imageUrl: '/images/plants/pothos.jpg',
    category: 'Indoor Plants',
    rating: 4.4,
    reviews: 78,
    stock: 25
  }
];

const mockCategories = [
  'Indoor Plants',
  'Outdoor Plants',
  'Succulents',
  'Herbs',
  'Flowering Plants',
  'Tropical Plants'
];

export const mockPlantService = {
  getPlants: async (page: number = 1, limit: number = 12, filters?: IPlantFilters): Promise<IPlantsResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredPlants = [...mockPlants];

    // Apply filters
    if (filters) {
      if (filters.category) {
        filteredPlants = filteredPlants.filter(plant => plant.category === filters.category);
      }
      if (filters.minPrice !== undefined) {
        filteredPlants = filteredPlants.filter(plant => plant.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        filteredPlants = filteredPlants.filter(plant => plant.price <= filters.maxPrice!);
      }
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'price_asc':
            filteredPlants.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredPlants.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredPlants.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            // In a real API, this would sort by creation date
            filteredPlants.reverse();
            break;
        }
      }
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const paginatedPlants = filteredPlants.slice(startIndex, startIndex + limit);

    return {
      plants: paginatedPlants,
      total: filteredPlants.length,
      totalPages: Math.ceil(filteredPlants.length / limit),
      page
    };
  },

  getPlantCategories: async (): Promise<string[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCategories;
  },

  getPlantById: async (id: string): Promise<IPlant | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPlants.find(plant => plant.id === id) || null;
  }
}; 