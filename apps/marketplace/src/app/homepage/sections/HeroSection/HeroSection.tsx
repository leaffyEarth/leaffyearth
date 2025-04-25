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
          src="/homepage_hero.png"
          alt="Beautiful desk plants in a modern workspace"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
      </div>
      <div className="absolute inset-0 " />
      <div className="container-custom relative z-10 flex h-full items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-balck md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg md:text-xl text-balck/90 max-w-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
} 