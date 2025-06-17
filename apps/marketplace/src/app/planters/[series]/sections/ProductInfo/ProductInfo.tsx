'use client';

import { useState, useMemo } from 'react';
import { Star } from 'lucide-react';
import { useSyncedUrlState } from '@/hooks/useSyncedUrlState';
import { useCart } from '@/hooks/useCart';
import type { IPlanter } from '@/types/planter';
import type { IPlant as IShopPlant } from '@/types/shop';
import { Suspense } from 'react';

interface ProductInfoProps {
  series: string;
  plantersOfThisSeries: IPlanter[];
  isLoading?: boolean;
}

export default function ProductInfoWrapper(props: ProductInfoProps) {
  return (
    <Suspense fallback={<ProductInfoSkeleton />}>
      <ProductInfo {...props} />
    </Suspense>
  );
}


function ProductInfo({ series, plantersOfThisSeries, isLoading = false }: ProductInfoProps) {
  const [quantity, setQuantity] = useState('1');
  const { addItem, openSidebar } = useCart();

  // Get unique sizes from variants
  const sizes = useMemo(() => {
    return Array.from(new Set(plantersOfThisSeries.map(v => v.size)));
  }, [plantersOfThisSeries]);

  // Get the selected size from URL or default to first size
  const [selectedSize, setSelectedSize] = useSyncedUrlState(
    'size',
    sizes[0],
    { validValues: sizes }
  );

  // Get the selected variant based on size
  const selectedVariant = useMemo(() => {
    return plantersOfThisSeries.find(v => v.size === selectedSize) || plantersOfThisSeries[0];
  }, [plantersOfThisSeries, selectedSize]);

  const quantityNumber = parseInt(quantity, 10);

  // Pricing and metadata
  const originalPrice = selectedVariant.price;
  const discountedPrice = Math.round(originalPrice * 0.7);
  const discountPercentage = 30;
  const rating = 4.8;
  const reviewCount = 376;

  if (isLoading || !plantersOfThisSeries || plantersOfThisSeries.length === 0) {
    // Show skeleton if loading or no variants available
    return <ProductInfoSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">{selectedVariant.name}</h1>
      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.floor(rating) ? 'fill-yellow-400' : 'fill-yellow-100'}`} />
          ))}
        </div>
        <span className="text-green-600 font-medium">{rating}</span>
        <span className="text-gray-600">({reviewCount} Reviews)</span>
      </div>
      {/* Pricing */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">₹{discountedPrice}</span>
        <span className="text-gray-500 line-through">₹{originalPrice}</span>
        <span className="text-green-600 font-medium">{discountPercentage}% off</span>
      </div>
      {/* Size Selection */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Select Size</h3>
        <div className="flex gap-3">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-full border-2 transition-all ${
                selectedSize === size ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Select Color</h3>
        <div className="flex gap-3">
          <button
              className={`w-8 h-8 rounded-full border-2 transition-all ring-2 ring-green-500 ring-offset-2`}
            style={{ backgroundColor: selectedVariant.color.hex }}
            title={selectedVariant.color.name}
          />
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setQuantity(Math.max(1, quantityNumber - 1).toString())}
          className="px-3 py-1 border rounded-lg hover:bg-gray-50"
        >
          −
        </button>
        <span>{quantity}</span>
        <button 
          onClick={() => setQuantity(Math.max(1, quantityNumber + 1).toString())}
          className="px-3 py-1 border rounded-lg hover:bg-gray-50"
        >
          +
        </button>
        <button
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          onClick={() => {
            const planterForCart: IShopPlant = {
              id: selectedVariant._id,
              name: selectedVariant.name,
              description: selectedVariant.description,
              price: selectedVariant.price,
              series: selectedVariant.planterSeries,
              size: selectedVariant.dimensions.height.toString(),
              imageUrl: selectedVariant.images[0] || '',
              stock: 100,
              rating: 5,
              reviews: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            addItem(planterForCart, quantityNumber);
            openSidebar();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} 


function ProductInfoSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      
      {/* Rating Skeleton */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-5 w-5 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-5 w-16 bg-gray-200 rounded" />
      </div>

      {/* Pricing Skeleton */}
      <div className="flex items-baseline gap-2">
        <div className="h-8 w-24 bg-gray-200 rounded" />
        <div className="h-6 w-20 bg-gray-200 rounded" />
        <div className="h-6 w-16 bg-gray-200 rounded" />
      </div>

      {/* Size Selection Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 w-20 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>

      {/* Color Selection Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="flex gap-3">
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Add to Cart Skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 bg-gray-200 rounded" />
        <div className="h-6 w-6 bg-gray-200 rounded" />
        <div className="h-8 w-8 bg-gray-200 rounded" />
        <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}