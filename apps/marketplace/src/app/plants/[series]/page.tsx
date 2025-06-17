import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { plantApi } from '@/lib/api/plantApi';
import type { IPlant } from '@/types/plant';
import PlantDetailPage from './sections/PlantDetailPage/PlantDetailPage';

type SeriesPageProps = {
  params: Promise<{ series: string }>;
};

// Pre-generate all plant-series routes at build time (SSG) with ISR
export async function generateStaticParams() {
  const seriesList = await plantApi.getAllPlantSeries();
  return seriesList.data.map((series: string) => ({ series }));
}

// Regenerate this page every 60 seconds
export const revalidate = 60;

// Dynamic metadata per series
export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { series } = await params;
  return {
    title: `${series} | LeaffyEarth`,
    description: `Shop ${series} in multiple sizes and styles at LeaffyEarth.`,
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series } = await params;
  
  try {
    // Remove any revalidate:0 from the API call
    const { data: variants } = await plantApi.getPlantsBySeries(series);
    if (!variants || variants.length === 0) notFound();

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
          <span>Home</span> / <span>Plants</span> / <span className="text-gray-900">{variants[0].plantSeries}</span>
        </div>
        <div className="container mx-auto px-4 pb-16">
          <PlantDetailPage plantVariantsOfThisSeries={variants} series={series} />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching plant data:', error);
    notFound();
  }
}