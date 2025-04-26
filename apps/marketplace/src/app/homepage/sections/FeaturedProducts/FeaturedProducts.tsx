import Image from 'next/image';
import Link from 'next/link';
import RoundedButton from '@/components/ui/RoundedButton';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
}

interface FeaturedProductsProps {
  title?: string;
  products: Product[];
}

export default function FeaturedProducts({ 
  title = "Featured Products",
  products 
}: FeaturedProductsProps) {
  return (
    <section className="py-16">
      <div className="container-custom">
        {/* Header - Show button on side for md and up */}
        <div className="hidden md:flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <RoundedButton href="/catalog">Show More</RoundedButton>
        </div>

        {/* Header - Mobile version without button */}
        <div className="md:hidden mb-8">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id}
              href={`/plants/${product.slug}`}
              className="group block"
            >
              <div className="aspect-square relative overflow-hidden bg-muted rounded-lg">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-foreground">{product.name}</h3>
                <p className="text-muted-foreground mt-1">From ${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More button - Mobile only, shown at bottom */}
        <div className="mt-8 md:hidden flex justify-center">
          <RoundedButton href="/catalog">Show More</RoundedButton>
        </div>
      </div>
    </section>
  );
} 