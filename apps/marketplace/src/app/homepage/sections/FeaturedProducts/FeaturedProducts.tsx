import Image from 'next/image';
import Link from 'next/link';

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
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <Link 
            href="/catalog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            SHOP ALL
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
} 