import HeroSection from './homepage/sections/HeroSection/HeroSection';
import FeaturedProducts from './homepage/sections/FeaturedProducts/FeaturedProducts';
import PromoBanner from './homepage/sections/PromoBanner/PromoBanner';
import PlantersCollection from './homepage/sections/PlantersCollection/PlantersCollection';
import ShopTheLook from './homepage/sections/ShopTheLook/ShopTheLook';
import BrandValues from './homepage/sections/BrandValues/BrandValues';
import VideoSection from './homepage/sections/VideoSection/VideoSection';
import PlantExperience from './homepage/sections/PlantExperience/PlantExperience';
import LandscapingSection from './homepage/sections/LandscapingSection/LandscapingSection';

// This would typically come from your CMS or API
const mockProducts = [
  {
    id: '1',
    name: 'Bird\'s Nest Maranta',
    price: 29.99,
    imageUrl: '/plants/maranta.jpg',
    slug: 'birds-nest-maranta'
  },
  {
    id: '2',
    name: 'Areca Palm',
    price: 39.99,
    imageUrl: '/plants/areca-palm.jpg',
    slug: 'areca-palm'
  },
  {
    id: '3',
    name: 'Red Maranta',
    price: 34.99,
    imageUrl: '/plants/red-maranta.jpg',
    slug: 'red-maranta'
  }
];

const mockPlanters = [
  {
    id: 'p1',
    name: 'Nordic Ceramic Planter',
    price: 24.99,
    imageUrl: '/planter/nordic-ceramic-planter.jpg',
    slug: 'nordic-ceramic-planter',
    material: 'Ceramic'
  },
  {
    id: 'p2',
    name: 'Minimalist Concrete Pot',
    price: 29.99,
    imageUrl: '/planter/minimalist-concrete-pot.jpg',
    slug: 'minimalist-concrete-pot',
    material: 'Concrete'
  },
  {
    id: 'p3',
    name: 'Terracotta Classic',
    price: 19.99,
    imageUrl: '/planter/terracotta-classic.jpg',
    slug: 'terracotta-classic',
    material: 'Terracotta'
  },
  {
    id: 'p4',
    name: 'Modern White Ceramic',
    price: 34.99,
    imageUrl: '/planter/modern-white-ceramic.jpg',
    slug: 'modern-white-ceramic',
    material: 'Ceramic'
  }
];

const shopTheLookData = {
  imageUrl: "/shop-the-look.png",
  hotspots: [
    {
      x: 35,
      y: 65,
      product: {
        id: '1',
        name: "Bird's Nest Maranta",
        price: 29.99,
        imageUrl: '/plants/maranta.jpg',
        slug: 'birds-nest-maranta',
        type: 'plant' as const
      }
    },
    {
      x: 58,
      y: 80,
      product: {
        id: 'p1',
        name: 'Fiddle Leaf Fig',
        price: 24.99,
        imageUrl: '/planter/fiddle-leaf-fig.jpg',
        slug: 'fiddle-leaf-fig',
        type: 'plant' as const
      }
    },
    {
      x: 73,
      y: 50,
      product: {
        id: '2',
        name: 'Rubber Plant',
        price: 39.99,
        imageUrl: '/plants/rubber-plant.jpg',
        slug: 'rubber-plant',
        type: 'plant' as const
      }
    }
  ]
};

export default function Home() {
  return (
    <main>
      <HeroSection
        title="Desk friendly plants"
        subtitle="Transform your workspace with our curated collection of desk-friendly plants"
      />
      <FeaturedProducts
        title="Featured Plants"
        products={mockProducts}
      />
      <PromoBanner
        title="Free Designer Pot with every Plant"
        description="Get handcrafted pots with your plant order. Limited time offer."
        ctaText="SHOP NOW"
        ctaLink="/catalog"
      />
      <PlantersCollection
        title="Explore Our Designer Planters"
        planters={mockPlanters}
      />
      <ShopTheLook
        title="Get The Look"
        description="Discover how our plants and planters work together to create the perfect space"
        imageUrl={shopTheLookData.imageUrl}
        hotspots={shopTheLookData.hotspots}
      />
      <BrandValues />
      <VideoSection
        thumbnailUrl="https://images.unsplash.com/photo-1625021217779-928660f4744e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        videoUrl="https://www.youtube.com/watch?v=T-ft0X_x7fw&t=7s"
      />
      <PlantExperience />
      <LandscapingSection />
    </main>
  );
}
