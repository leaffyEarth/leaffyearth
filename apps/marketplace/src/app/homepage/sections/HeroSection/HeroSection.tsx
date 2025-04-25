import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

export default function HeroSection({ title = "Desk friendly plants", subtitle }: HeroSectionProps) {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1620766391965-e68d7b24520c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beautiful desk plants in a modern workspace"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20" />
      <div className="container-custom relative z-10 flex h-full items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
} 