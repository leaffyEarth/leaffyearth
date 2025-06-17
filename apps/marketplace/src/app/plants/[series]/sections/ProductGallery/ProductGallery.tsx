'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  isBestSeller?: boolean;
  isLoading?: boolean;
}

export default function ProductGallery({ images, name, isLoading }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading || !images || images.length === 0) {
    // Show skeleton if no images available
    return <ProductGallerySkeleton />;
  }

  return (
    <div className="relative">

      <div className="flex gap-4">
        {/* Thumbnail Navigation - Vertical */}
        <div className="hidden md:flex flex-col gap-2 py-2">
          <button
            onClick={() => {
              if (selectedImage > 0) setSelectedImage(selectedImage - 1);
            }}
            className="text-gray-500 hover:text-gray-700 flex justify-center items-center"
            disabled={selectedImage === 0}
          >
            <ChevronUp className="w-6 h-6" />
          </button>

          <div className="flex flex-col gap-2 overflow-hidden h-[400px]">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                  ${selectedImage === index ? 'border-green-500' : 'border-transparent hover:border-gray-200'}`}
              >
                <Image
                  src={image}
                  alt={`${name} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (selectedImage < images.length - 1) setSelectedImage(selectedImage + 1);
            }}
            className="text-gray-500 hover:text-gray-700 flex justify-center items-center"
            disabled={selectedImage === images.length - 1}
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Main Image */}
        <div className="flex-1">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={images[selectedImage]}
              alt={`${name} - Image ${selectedImage + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile Thumbnail Navigation - Horizontal */}
          <div className="md:hidden flex gap-2 mt-4 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all
                  ${selectedImage === index ? 'border-green-500' : 'border-transparent hover:border-gray-200'}`}
              >
                <Image
                  src={image}
                  alt={`${name} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


function ProductGallerySkeleton() {
  return (
    <div className="relative animate-pulse">
      <div className="flex gap-4">
        {/* Vertical Thumbnails Skeleton */}
        <div className="hidden md:flex flex-col gap-2 py-2">
          <div className="h-6 w-6 bg-gray-200 rounded mx-auto mb-2" />
          <div className="flex flex-col gap-2 overflow-hidden h-[400px]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-16 h-16 rounded-lg bg-gray-200" />
            ))}
          </div>
          <div className="h-6 w-6 bg-gray-200 rounded mx-auto mt-2" />
        </div>
        {/* Main Image Skeleton */}
        <div className="flex-1">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200" />
          {/* Horizontal Thumbnails Skeleton (Mobile) */}
          <div className="md:hidden flex gap-2 mt-4 overflow-x-auto pb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-16 h-16 flex-shrink-0 rounded-lg bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}