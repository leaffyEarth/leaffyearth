import { Droplet, Sun, PawPrint, Sprout } from 'lucide-react';

interface CareInstructions {
  watering: string;
  sunlight: string;
  petFriendly: boolean;
  difficulty: string;
}

interface ProductCareProps {
  isLoading?: boolean;
  careInstructions: CareInstructions;
}

export default function ProductCare({ isLoading=false, careInstructions }: ProductCareProps) {
  if (isLoading) {
    return <ProductCareSkeleton />;
  }
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Plant Care</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {/* Watering Instructions */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-blue-100 rounded-full">
            <Droplet className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Watering</h3>
            <p className="mt-1 text-sm text-gray-600">{careInstructions.watering}</p>
          </div>
        </div>

        {/* Sunlight Requirements */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-yellow-100 rounded-full">
            <Sun className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Light</h3>
            <p className="mt-1 text-sm text-gray-600">{careInstructions.sunlight}</p>
          </div>
        </div>

        {/* Pet Friendly Status */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-red-100 rounded-full">
            <PawPrint className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Pet Friendly</h3>
            <p className="mt-1 text-sm text-gray-600">
              {careInstructions.petFriendly ? 'Safe for pets' : 'Not pet friendly'}
            </p>
          </div>
        </div>

        {/* Care Difficulty */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="p-2 bg-green-100 rounded-full">
            <Sprout className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Care Level</h3>
            <p className="mt-1 text-sm text-gray-600">{careInstructions.difficulty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCareSkeleton() {
  return (
    <div className="mt-8 space-y-6 animate-pulse">
      <div className="h-7 w-32 bg-gray-200 rounded" />
      <div className="grid grid-cols-1 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 rounded-full bg-gray-200 h-9 w-9" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}