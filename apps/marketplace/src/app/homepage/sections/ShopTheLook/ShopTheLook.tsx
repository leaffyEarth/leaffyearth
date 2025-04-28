"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  type: 'plant' | 'planter';
}

interface Hotspot {
  x: number; // percentage from left
  y: number; // percentage from top
  product: Product;
}

interface ShopTheLookProps {
  title?: string;
  description?: string;
  imageUrl: string;
  hotspots: Hotspot[];
}

export default function ShopTheLook({
  title = "Shop The Look",
  description = "Get inspired by our curated collections and recreate the look in your space",
  imageUrl,
  hotspots
}: ShopTheLookProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section className="relative w-full">
      {/* Container with 21:8 aspect ratio */}
      <div className="relative w-full" style={{ paddingTop: 'calc(8 / 21 * 100%)' }}>
        {/* Main Image Container */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt="Shop the look inspiration"
              fill
              className="object-contain"
              sizes="100vw"
              priority
              quality={90}
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Title Overlay */}
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">{description}</p>
            </div>

            {/* Hotspots Container */}
            <div className="absolute inset-0">
              {/* Hotspots */}
              {hotspots.map((hotspot) => (
                <div
                  key={hotspot.product.id}
                  className="absolute"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {/* Hotspot Button */}
                  <button
                    className="relative z-20 w-6 h-6 rounded-full bg-white flex items-center justify-center 
                             hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                             before:content-[''] before:absolute before:w-2.5 before:h-2.5 before:rounded-full before:bg-[#4CAF50]"
                    onMouseEnter={() => setActiveHotspot(hotspot.product.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    aria-label={`View ${hotspot.product.name}`}
                  >
                    {/* Pulse Animation */}
                    <span className="absolute -inset-1 rounded-full bg-black/20 animate-ping" />
                  </button>

                  {/* Product Card */}
                  <div
                    className={`absolute z-30 ${hotspot.x > 50 ? '-right-4 translate-x-full' : '-left-4 -translate-x-full'} 
                             ${hotspot.y > 50 ? 'bottom-0' : 'top-0'} w-64 transition-all duration-200
                             ${activeHotspot === hotspot.product.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                  >
                    <Link href={`/${hotspot.product.type}s/${hotspot.product.slug}`}>
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="relative aspect-square">
                          <Image
                            src={hotspot.product.imageUrl}
                            alt={hotspot.product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 256px"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-foreground">{hotspot.product.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">${hotspot.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 