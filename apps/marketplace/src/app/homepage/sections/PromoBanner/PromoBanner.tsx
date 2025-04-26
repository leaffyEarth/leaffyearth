import Image from 'next/image';
import RoundedButton from '@/components/ui/RoundedButton';

interface PromoBannerProps {
  title: string;
  description: string;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
}

export default function PromoBanner({
  title = "Design Your Perfect Plant-and-Pot Pairing",
  description = "See every plant in every designer pot and room style before you buy. Personalize the look, from tabletop succulents to statement fiddle-leaf figs.",
  imageUrl = "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072",
  ctaText = "SHOP NOW",
  ctaLink = "/catalog"
}: PromoBannerProps) {
  return (
    <section className="bg-primary py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[4/3] md:aspect-square w-full rounded-2xl overflow-hidden">
            <Image
              src="/fiddle-leaf-stting.png"
              alt="Collection of beautiful designer plant pots"
              // fill
              // sizes="(max-width: 768px) 100vw, 50vw"
              width={450}
              height={850}
              priority
              quality={90}
            />
          </div>
          <div className="max-w-xl">
            <h2 className="text-3xl text-muted md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              {title}
            </h2>
            <p className="text-muted text-lg mb-8">
              {description}
            </p>
            <RoundedButton 
              href={ctaLink} 
              variant="transparent"
            >
              {ctaText}
            </RoundedButton>
          </div>
        </div>
      </div>
    </section>
  );
} 