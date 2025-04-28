'use client';

import Link from 'next/link';

const TopBanner = () => {
  return (
    <div className="bg-[#E8411A] text-gray-800 py-2 text-center text-sm">
      <Link href="/products" className="hover:underline">
        Free Delivery Above ₹499 | Shop Now
      </Link>
    </div>
  );
};

export default TopBanner; 