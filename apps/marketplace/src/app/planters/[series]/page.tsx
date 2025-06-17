import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { planterApi } from '@/lib/api/planterApi';
import type { IPlanter, IPlanterSeries } from '@/types/planter';
import PlanterDetailPage from './sections/PlanterDetailPage/PlanterDetailPage';

// Update props to match Next.js internal PageProps
type SeriesPageProps = {
  params: Promise<{ series: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

// SSG: Pre-generate all planter-series routes at build time
export async function generateStaticParams() {
  const seriesList = await planterApi.getAllPlanterSeries();
  return seriesList.map((planterCategory: IPlanterSeries) => ({
    series: planterCategory._id,
  }));
}

// ISR: Regenerate this page every 60 seconds
export const revalidate = 60;

// SEO: Dynamic metadata per series
export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { series } = await params;
  return {
    title: `${series} | LeaffyEarth`,
    description: `Shop ${series} in multiple sizes and styles at LeaffyEarth.`,
  };
}

// Dynamic route page
export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series } = await params;

  try {
    const variants = await planterApi.getPlantersBySeries(series);
    if (!variants || variants.length === 0) notFound();

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
          <span>Home</span> / <span>Planters</span> /{' '}
          <span className="text-gray-900">{variants[0].planterSeries}</span>
        </div>
        <div className="container mx-auto px-4 pb-16">
          <PlanterDetailPage
            series={series}
            plantersOfThisSeries={variants}
          />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching planter data:', error);
    notFound();
  }
}