import { notFound } from 'next/navigation';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductCare from './components/ProductCare';

interface PlantPageProps {
  params: {
    slug: string;
  };
}

// This would typically come from your API/database
const getMockPlantData = (slug: string) => {
  // For demo purposes, returning mock data
  return {
    id: '1',
    name: 'Brazilian Wood Plant',
    slug: 'brazilian-wood-plant',
    rating: 4.7,
    reviewCount: 115,
    originalPrice: 1999,
    discountedPrice: 499,
    discountPercentage: 76,
    images: [
      '/plants/brazilian-wood-1.jpg',
      '/plants/brazilian-wood-2.jpg',
      '/plants/brazilian-wood-3.jpg',
      '/plants/brazilian-wood-4.jpg',
    ],
    careInstructions: {
      watering: 'Water Once A Week',
      sunlight: 'Needs Bright Indirect Sunlight',
      petFriendly: false,
      difficulty: 'Beginner Friendly'
    }
  };
};

export default function PlantPage({ params }: PlantPageProps) {
  const plantData = getMockPlantData(params.slug);

  if (!plantData) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Non-scrollable Gallery */}
        <div className="lg:w-1/2 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
          <ProductGallery images={plantData.images} name={plantData.name} />
        </div>

        {/* Right Column - Scrollable Content */}
        <div className="lg:w-1/2">
          <ProductInfo 
            name={plantData.name}
            rating={plantData.rating}
            reviewCount={plantData.reviewCount}
            originalPrice={plantData.originalPrice}
            discountedPrice={plantData.discountedPrice}
            discountPercentage={plantData.discountPercentage}
          />
          <ProductCare careInstructions={plantData.careInstructions} />
        </div>
      </div>
    </main>
  );
} 