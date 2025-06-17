'use client';

import { useState } from 'react';
import ProductGallery from '../ProductGallery/ProductGallery';
import type { IPlanter } from '@/types/planter';
import ProductCare from '../ProductCare/ProductCare';
import ProductInfoWrapper from '../ProductInfo/ProductInfo';

interface Props {
  series: string;
  plantersOfThisSeries: IPlanter[];
}

export default function PlanterDetailPage({ series, plantersOfThisSeries  }: Props) {
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
        images={plantersOfThisSeries[0].images}
        isLoading={isLoading}
        name={plantersOfThisSeries[0].name}
      />
      </div>
      <div className="lg:w-1/2">
        <ProductInfoWrapper
          series={series}
          plantersOfThisSeries={plantersOfThisSeries}
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