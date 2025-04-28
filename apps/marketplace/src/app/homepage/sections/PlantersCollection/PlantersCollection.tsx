import Image from 'next/image';
import Link from 'next/link';

interface Planter {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
  material?: string;
}

interface PlantersCollectionProps {
  title?: string;
  planters: Planter[];
}

export default function PlantersCollection({ 
  title = "Designer Planters Collection",
  planters 
}: PlantersCollectionProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <Link 
            href="/planters"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            VIEW ALL
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {planters.map((planter) => (
            <Link 
              key={planter.id}
              href={`/planters/${planter.slug}`}
              className="group block"
            >
              <div className="aspect-square relative overflow-hidden bg-white rounded-xl">
                <Image
                  src={planter.imageUrl}
                  alt={planter.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {planter.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {planter.material && <span className="mr-2">{planter.material}</span>}
                  ${planter.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 