'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import Image from 'next/image';
import type { IPlant } from '@/types/plant';
import { useSyncedUrlState } from '@/hooks/useSyncedUrlState';
import { useCart } from '@/hooks/useCart';
import type { IPlant as IShopPlant } from '@/types/shop';
import CryptoJS from 'crypto-js';
import { Suspense } from 'react';


interface VariantData {
  size: string;
  planter: string;
  qty: string;
}

function encryptVariantData(data: VariantData): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.ENCRYPTION_KEY || '').toString();
}

function decryptVariantData(encryptedData: string): VariantData | null {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.ENCRYPTION_KEY || '');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return null;
  }
}

interface ProductInfoProps {
  series: string;
  plantVariantsOfThisSeries: IPlant[];
  isLoading?: boolean;
  onPlanterChange?: (images: string[] | null) => void;
}

type SizeType = 'small' | 'medium' | 'large';

export default function ProductInfoWrapper(props: ProductInfoProps) {
  return (
    <Suspense fallback={<ProductInfoSkeleton />}>
      <ProductInfo {...props} />
    </Suspense>
  );
}

function ProductInfo({ series, plantVariantsOfThisSeries, isLoading, onPlanterChange }: ProductInfoProps) {
  const [loadingSession, setLoadingSession] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem, openSidebar } = useCart();

  const validQuantities = Array.from({ length: 100 }, (_, i) => (i + 1).toString());
  const [quantity, setQuantity] = useSyncedUrlState<string>('qty', '1', {
    validValues: validQuantities,
  });
  const quantityNumber = parseInt(quantity, 10) || 1;
  
  const sizeOrder: Record<SizeType, number> = { 'small': 0, 'medium': 1, 'large': 2 };
  const sizes = useMemo(() => 
    Array.from(new Set(plantVariantsOfThisSeries.map(v => v.size)))
      .sort((a, b) => {
        const aOrder = sizeOrder[a.toLowerCase() as SizeType] ?? 999;
        const bOrder = sizeOrder[b.toLowerCase() as SizeType] ?? 999;
        return aOrder - bOrder;
      }), 
    [plantVariantsOfThisSeries]
  );
  const [selectedSize, setSelectedSize] = useSyncedUrlState('size', sizes[0], {
    validValues: sizes
  });

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    setSelectedPlanterWithDetailPopluated(plantersArray[0]);
  }

 
  const selectedPlant = useMemo(() => {
    return plantVariantsOfThisSeries.find(v => v.size === selectedSize) || plantVariantsOfThisSeries[0];
  }, [plantVariantsOfThisSeries, selectedSize]);

  const plantersArray = useMemo(
    () => selectedPlant.planterVariants.map((p) => ({
      id: p.planter._id,
      name: p.planter.name,
      category: p.planter.planterCategory,
      series: p.planter.planterSeries,
      dimensions: p.planter.dimensions,
      color: p.planter.color,
      price: p.planter.price,
      images: p.planter.images,
      size: p.planter.size,
      sku: p.planter.sku,
      description: p.planter.description,
      variantImages: p.images
    })),
    [selectedPlant]
  )

  const [selectedPlanterId, setSelectedPlanterId] = useSyncedUrlState(
    'planter',
    plantersArray[0]?.id,
    { validValues: plantersArray.map(p => p.id) }
  );
  const [selectedPlanterWithDetailPopluated, setSelectedPlanterWithDetailPopluated] = useState(() => {
    return plantersArray.find(p => p.id === selectedPlanterId) || plantersArray[0];
  });

  const pendingPlanterIdRef = useRef<string | null>(null);

  // const planterVariantInsidePlants = useMemo(
  //   () => selectedPlant.planterVariants.find(p => p.planter._id === selectedPlanterWithDetailPopluated.id)!,
  //   [selectedPlant, selectedPlanterWithDetailPopluated]
  // );
  // const colors = planterVariantInsidePlants.planter.color?.map(color => ({ id: color, value: color }));
  // const [selectedColor, setSelectedColor] = useState(colors);
  // useEffect(() => { setSelectedColor(colors); }, [colors]);


  //Selected Planter Color
  const colors = selectedPlanterWithDetailPopluated.color;


  // Pricing and metadata
  const originalPrice = selectedPlant.price;
  const discountedPrice = Math.round(originalPrice * 0.7);
  const discountPercentage = 30;
  const rating = 4.8;
  const reviewCount = 376;

  useEffect(() => {
    if (onPlanterChange) {
      if (selectedPlanterWithDetailPopluated) {
        onPlanterChange([...selectedPlant.images, selectedPlanterWithDetailPopluated.variantImages].flat());
      } else {
        onPlanterChange(selectedPlant.images);
      }
    }
  }, [selectedPlanterWithDetailPopluated]);

  /* Replace Redis session store with encrypted URL parameters */
  useEffect(() => {
    const variantData = searchParams.get('v');
    if (!variantData) {
      setLoadingSession(false);
      return;
    }

    const decryptedData = decryptVariantData(variantData);
    if (decryptedData) {
      if (decryptedData.size) setSelectedSize(decryptedData.size);
      if (decryptedData.qty) setQuantity(decryptedData.qty);
      if (decryptedData.planter) {
        pendingPlanterIdRef.current = decryptedData.planter;
      }
    }
    setLoadingSession(false);
  }, []);

  // Update URL with encrypted data
  useEffect(() => {
    const variantData: VariantData = {
      size: selectedSize,
      planter: selectedPlanterWithDetailPopluated.id,
      qty: quantity,
    };

    const encryptedData = encryptVariantData(variantData);
    const url = new URL(window.location.href);
    url.searchParams.set('v', encryptedData);
    url.searchParams.delete('size');
    url.searchParams.delete('planter');
    url.searchParams.delete('qty');
    router.replace(url.toString(), { scroll: false });
  }, [selectedSize, selectedPlanterWithDetailPopluated, quantity]);

  // Step 2: Apply planter selection once planters are ready
    useEffect(() => {
      if (!pendingPlanterIdRef.current || plantersArray.length === 0) return;

      const match = plantersArray.find(p => p.id === pendingPlanterIdRef.current);
      if (match) {
        setSelectedPlanterWithDetailPopluated(match);
        setSelectedPlanterId(match.id); // Also update synced state if needed
      }

      pendingPlanterIdRef.current = null; // Clear after applying
    }, [plantersArray]);

  if (isLoading || loadingSession) {
    return <ProductInfoSkeleton />;
  }
  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">{selectedPlant.name}</h1>
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
              onClick={() => handleSizeChange(size)}
              className={`px-4 py-2 rounded-full border-2 transition-all ${
                selectedSize === size ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {/* Planter Selection */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Select Planter</h3>
        <div className="grid grid-cols-5 gap-2">
          {plantersArray.map(planter => (
            <button
              key={planter.id}
              onClick={() => {
                setSelectedPlanterWithDetailPopluated(planter);
                setSelectedPlanterId(planter.id);
              }}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedPlanterWithDetailPopluated.id === planter.id ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image src={planter.images[0]} alt={planter.name} fill className="object-cover" />
              {selectedPlanterWithDetailPopluated.id === planter.id && (
                <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Color Selection */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Color – {colors.name}</h3>
        <div className="flex gap-2">
          {/* {colors.map(color => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColor.id === color.id ? 'ring-2 ring-green-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
              }`}
              style={{ backgroundColor: color.value }}
            />
          ))} */}
          <button
              // onClick={() => setSelectedColor(color)}
              // className={`w-8 h-8 rounded-full border-2 transition-all ${
              //   selectedColor.id === color.id ? 'ring-2 ring-green-500 ring-offset-2' : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
              // }`}
              className={`w-8 h-8 rounded-full border-2 transition-all ring-2 ring-green-500 ring-offset-2`}
              style={{ backgroundColor: colors.hex }}
            />
        </div>
      </div>
      {/* Quantity + Actions */}
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
            // Compose a unique id for plant+planter combo
            const cartId = `${selectedPlant._id}_${selectedPlanterWithDetailPopluated.id}`;
            const plantForCart: IShopPlant = {
              id: cartId,
              name: `${selectedPlant.name} + ${selectedPlanterWithDetailPopluated.name}`,
              description: `${selectedPlant.description} | Planter: ${selectedPlanterWithDetailPopluated.name}`,
              price: selectedPlanterWithDetailPopluated.price + selectedPlant.price,
              series: selectedPlant.plantSeries,
              size: selectedPlant.size,
              imageUrl: selectedPlanterWithDetailPopluated.images[0] || selectedPlant.images[0] || '',
              stock: 100,
              rating: 5,
              reviews: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            addItem(plantForCart, quantityNumber);
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
      {/* Planter Selection Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-gray-200" />
          ))}
        </div>
      </div>
      {/* Color Selection Skeleton */}
      <div className="space-y-2">
        <div className="h-5 w-24 bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </div>
      {/* Quantity and Add to Cart Skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 bg-gray-200 rounded" />
        <div className="h-6 w-6 bg-gray-200 rounded" />
        <div className="h-8 w-8 bg-gray-200 rounded" />
        <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
}