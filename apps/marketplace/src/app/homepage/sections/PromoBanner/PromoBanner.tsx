import Image from 'next/image';
import Link from 'next/link';

interface PromoBannerProps {
  title: string;
  description: string;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
}

export default function PromoBanner({
  title = "Free Designer Pot with every Plant",
  description = "Get handcrafted pots with your plant order. Limited time offer.",
  imageUrl = "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072",
  ctaText = "SHOP NOW",
  ctaLink = "/catalog"
}: PromoBannerProps) {
  return (
    <section className="bg-primary/5 py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[4/3] md:aspect-square w-full rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1692604947955-ea7c8e41fa8c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Collection of beautiful designer plant pots"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              quality={90}
            />
          </div>
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              {title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {description}
            </p>
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 