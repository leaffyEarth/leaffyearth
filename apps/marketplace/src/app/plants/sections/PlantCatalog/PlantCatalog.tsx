'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { usePlants, usePlantCategories } from '@/hooks/usePlants';
import type { IPlantFilters } from '@/types/plant';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export default function PlantCatalog() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<IPlantFilters>({});
  const { plants, total, totalPages, isLoading, error } = usePlants(page, 12, filters);
  const { data: categories, isLoading: categoriesLoading } = usePlantCategories();

  const handleFilterChange = useCallback((key: keyof IPlantFilters, value: string | number | null) => {
    setFilters(prev => {
      setPage(1);
      return value ? { ...prev, [key]: value } : { ...prev, [key]: undefined };
    });
  }, []);

  const handlePriceRangeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    switch (value) {
      case 'under-25':
        handleFilterChange('maxPrice', 25);
        break;
      case '25-50':
        handleFilterChange('minPrice', 25);
        handleFilterChange('maxPrice', 50);
        break;
      case '50-100':
        handleFilterChange('minPrice', 50);
        handleFilterChange('maxPrice', 100);
        break;
      case 'over-100':
        handleFilterChange('minPrice', 100);
        handleFilterChange('maxPrice', null);
        break;
      default:
        handleFilterChange('minPrice', null);
        handleFilterChange('maxPrice', null);
    }
  }, [handleFilterChange]);

  if (error) {
    return <ErrorMessage message="Failed to load plants. Please try again later." />;
  }

  return (
    <div className="w-full bg-gray-50">
      <section className="max-w-8xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8 py-6">
          {/* <h2 className="text-lg font-semibold mb-4">Filter Plants</h2> */}
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="text-sm text-gray-600">Category</label>
              <select
                id="category"
                className="px-4 py-2 border rounded-lg min-w-[200px]"
                onChange={(e) => handleFilterChange('category', e.target.value || null)}
                disabled={categoriesLoading}
              >
                <option value="">All Categories</option>
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="price-range" className="text-sm text-gray-600">Price Range</label>
              <select
                id="price-range"
                className="px-4 py-2 border rounded-lg min-w-[200px]"
                onChange={handlePriceRangeChange}
              >
                <option value="">Any Price</option>
                <option value="under-25">Under ₹2,000</option>
                <option value="25-50">₹2,000 to ₹4,000</option>
                <option value="50-100">₹4,000 to ₹8,000</option>
                <option value="over-100">Over ₹8,000</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="sort" className="text-sm text-gray-600">Sort By</label>
              <select
                id="sort"
                className="px-4 py-2 border rounded-lg min-w-[200px]"
                onChange={(e) => handleFilterChange('sortBy', e.target.value || null)}
              >
                <option value="">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            {isLoading ? (
              'Finding plants...'
            ) : (
              `Showing ${plants.length} of ${total} plants`
            )}
          </p>
        </div>

        {/* Plant Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <div 
                key={plant.id} 
                className="rounded-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={plant.imageUrl}
                    alt={plant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {plant.offer && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      {plant.offer.label}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900">{plant.name}</h3>
                  <div className="flex items-baseline mb-4">
                    {plant.discountedPrice ? (
                      <>
                        <span className="text-xl font-bold text-green-600">
                          ₹{plant.discountedPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="ml-2 text-xs text-gray-500 line-through">
                          ₹{plant.price.toLocaleString('en-IN')}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-gray-900">
                        ₹{plant.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors"
                    onClick={() => window.location.href = `/plants/${plant.id}`}
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav role="navigation" aria-label="Pagination">
              <div className="flex gap-2 items-center">
                <button
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 disabled:hover:bg-white"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  Previous
                </button>
                <span className="px-4 py-2" aria-current="page">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 disabled:hover:bg-white"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </nav>
          </div>
        )}
      </section>
    </div>
  );
} 