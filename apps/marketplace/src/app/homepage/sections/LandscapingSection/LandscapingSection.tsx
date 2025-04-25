"use client"

import Image from 'next/image';
import Link from 'next/link';

export default function LandscapingSection() {
  return (
    <section className="relative h-[600px] w-screen -mx-[calc((100vw-100%)/2)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1585261450021-b8b6c798b093?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Landscaping and personalized orders"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full container-custom flex flex-col items-center justify-center text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Landscaping,{' '}
          <span className="block mt-2">Personalized order</span>
        </h2>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
          Get in touch for your special needs. Our in-house designers 
          personalize Bulk Orders as well as do Landscaping projects 
          for any environments either social or Personal.
        </p>

        <Link 
          href="/contact"
          className="inline-flex items-center px-8 py-3 border-2 border-white 
                   text-white hover:bg-white hover:text-black transition-colors 
                   duration-300 text-lg font-medium tracking-wide"
        >
          CONTACT US
        </Link>
      </div>
    </section>
  );
} 