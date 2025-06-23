'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
}

export default function ProductInfo({
  name,
  rating,
  reviewCount,
  originalPrice,
  discountedPrice,
  discountPercentage,
}: ProductInfoProps) {
  const [planter, setPlanter] = useState<'Lotus Bowl' | 'Concrete Bowl'>('Lotus Bowl');
  const [statue, setStatue] = useState<'None' | 'Buddha' | 'Monk'>('None');
  const [quantity, setQuantity] = useState(1);
  const [isGift, setIsGift] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">{name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">({reviewCount} Reviews)</span>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900">₹{discountedPrice}</span>
        <span className="text-lg text-gray-500 line-through">₹{originalPrice}</span>
        <span className="text-sm font-medium text-green-600">{discountPercentage}% off</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">SELECT PLANTER</label>
          <div className="mt-2 flex gap-3">
            {['Lotus Bowl', 'Concrete Bowl'].map((option) => (
              <button
                key={option}
                onClick={() => setPlanter(option as typeof planter)}
                className={`px-4 py-2 rounded-full text-sm ${
                  planter === option
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">SELECT STATUE</label>
          <div className="mt-2 flex gap-3">
            {['None', 'Buddha', 'Monk'].map((option) => (
              <button
                key={option}
                onClick={() => setStatue(option as typeof statue)}
                className={`px-4 py-2 rounded-full text-sm ${
                  statue === option
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isGift}
              onChange={(e) => setIsGift(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
            />
            <span className="text-sm text-gray-700">Make This a Gift</span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="px-3 py-2 text-gray-600 hover:text-gray-700"
            >
              -
            </button>
            <span className="px-3 py-2 text-gray-800">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-gray-600 hover:text-gray-700"
            >
              +
            </button>
          </div>
          <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">
            ADD TO CART
          </button>
        </div>

        <button className="w-full border border-green-600 text-green-600 px-6 py-3 rounded-md hover:bg-green-50">
          BUY NOW
        </button>

        <div className="border border-dashed border-gray-300 rounded-md p-3 text-sm text-gray-600">
          Get 10% OFF On All Orders Above ₹1499 | Use Code : SAVE10
        </div>
      </div>
    </div>
  );
} 