'use client';

import { useState, useMemo } from 'react';
import ProductGallery from '../ProductGallery/ProductGallery';
import type { IPlant } from '@/types/plant';
import ProductCare from '../ProductCare/ProductCare';
import ProductInfoWrapper from '../ProductInfo/ProductInfo';

interface Props {
  plantVariantsOfThisSeries: IPlant[];
  series: string;
}

export default function PlantDetailPage({ plantVariantsOfThisSeries, series }: Props) {
  const [selectedPlanterImages, setSelectedPlanterImages] = useState<string[] | null>(null);
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const initialSize = searchParams.get('size');
  const plantImages = useMemo(() => {
    const variant = plantVariantsOfThisSeries.find(v => v.size === initialSize) || plantVariantsOfThisSeries[0];
    return variant.images;
  }, [plantVariantsOfThisSeries, initialSize]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for initial render
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  });


  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/2 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
        <ProductGallery
          images={selectedPlanterImages || plantImages}
          name={series}
          isLoading={isLoading}
        />
      </div>

      <div className="lg:w-1/2">
        <ProductInfoWrapper
          plantVariantsOfThisSeries={plantVariantsOfThisSeries}
          series={series}
          onPlanterChange={setSelectedPlanterImages}
          isLoading={isLoading}
        />
        <ProductCare
          isLoading={isLoading}
          careInstructions={{
            watering: 'Water every 1-2 weeks, allowing the soil to dry out between waterings.',
            sunlight: 'Prefers bright, indirect light. Avoid direct sunlight.',
            petFriendly: false,
            difficulty: 'Easy',
          }} 
        />
      </div>
    </div>
  );
}