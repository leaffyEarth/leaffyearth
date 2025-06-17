"use client"

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { usePlants} from '@/hooks/usePlants';
import type { IPlantFilters, IPlant } from '@/types/plant';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useAuth } from '@/hooks/useAuth';

// interface PlantCatalogClientProps {
//   initialPlants: {
//     data: any[];
//     total: number;
//     // totalPages: number;
//   };
//   initialSeries: { data: any };
// }

export default function PlantCatalogClientSide({ 
  initialPlants,
  initialSeries 
}: any) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<IPlantFilters>({});
  const { idToken } = useAuth();
  const { 
    plants, 
    total, 
    totalPages, 
    page: pageNumber,
    isLoading, 
    error 
  } = usePlants(page, 12, filters, {
    initialData: initialPlants,
    enabled: page !== 1 || Object.keys(filters).length > 0 // Only fetch if page changes or filters applied
  }, idToken || undefined);

  const handleFilterChange = useCallback((key: keyof IPlantFilters, value: string | number | null) => {
    setFilters(prev => {
      setPage(1);
      return value ? { ...prev, [key]: value } : { ...prev, [key]: undefined };
    });
  }, []);

  const handlePriceRangeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    switch (value) {
      case 'under-500':
        handleFilterChange('maxPrice', 500);
        break;
      case '500-1000':
        handleFilterChange('minPrice', 500);
        handleFilterChange('maxPrice', 1000);
        break;
      case '1000-2000':
        handleFilterChange('minPrice', 1000);
        handleFilterChange('maxPrice', 2000);
        break;
      case 'over-2000':
        handleFilterChange('minPrice', 2000);
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
          <h2 className="text-lg font-semibold mb-4">Filter Plants</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="series" className="text-sm text-gray-600">Series</label>
              <select
                id="series"
                className="px-4 py-2 border rounded-lg min-w-[200px]"
                onChange={(e) => handleFilterChange('plantSeries', e.target.value || null)}
              >
                <option value="">All Categories</option>
                {initialSeries?.data?.map((series: string) => (
                  <option key={series} value={series}>
                    {series}
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
                <option value="under-500">Under ₹500</option>
                <option value="500-1000">₹500 to ₹1,000</option>
                <option value="1000-2000">₹1,000 to ₹2,000</option>
                <option value="over-2000">Over ₹2,000</option>
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
            {plants.map((plant: IPlant) => (
              <div 
                key={plant._id} 
                className="rounded-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={plant.images[0]}
                    alt={plant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* {plant.offer && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      {plant.offer.label}
                    </div>
                  )} */}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1 text-gray-900">{plant.plantSeries}</h3>
                  <div className="flex items-baseline mb-4">
                    {plant.price ? (
                      <>
                        <span className="text-xl font-bold text-green-600">
                          ₹{plant.price.toLocaleString('en-IN')}
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
                    onClick={() => window.location.href = `/plants/${plant.plantSeries}`}
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