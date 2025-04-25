import Image from 'next/image';

export default function PlantHero() {
  return (
    <section className="relative w-full h-[50vh] min-h-[400px]">
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
      <div className="relative h-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Discover Our Premium Plants
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Transform your space with our carefully curated collection of indoor and outdoor plants. 
            Each plant is hand-picked for its beauty, health, and ability to thrive in your home.
          </p>
        </div>
      </div>
    </section>
  );
} 