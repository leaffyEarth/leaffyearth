'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PlantHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1571028557446-2965a546c3a9?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beautiful collection of indoor plants"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-5xl font-bold mb-4">Discover Our Plant Collection</h1>
          <p className="text-xl">
            Explore our curated selection of beautiful plants, perfect for bringing life and nature into your home.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 