import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

export default function HeroSection({ title = "Desk friendly plants", subtitle }: HeroSectionProps) {
  return (
    <section className="relative w-full aspect-[16/9] lg:aspect-[21/7] overflow-hidden">
      <div className="absolute inset-0">
        {/* Mobile Image */}
        <div className="block lg:hidden w-full h-full relative">
          <Image
            src="/homepage_hero_sm.png"
            alt="Beautiful desk plants in a modern workspace"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
        
        {/* Desktop Image */}
        <div className="hidden lg:block w-full h-full relative">
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
      </div>
      <div className="absolute inset-0" />
      
    </section>
  );
} 