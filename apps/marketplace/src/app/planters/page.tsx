import PlanterHero from './sections/PlanterHero/PlanterHero';
import { planterApi } from '@/lib/api/planterApi';
import PlanterCatalogClientSide from "./sections/PlanterCatalogue/PlanterCatalogClientSide"

export default async function PlantersPage() {
  try {
    const [plantersData, plantersSeries] = await Promise.all([
      planterApi.getPlanters(1, 12, undefined, {
        cache: 'no-cache'
      }),
      planterApi.getAllPlanterSeries({
        cache: 'no-cache'
      })
    ]);
    return (
      <main>
        <PlanterHero />
        <PlanterCatalogClientSide 
          initialPlanters={plantersData}
          initialSeries={plantersSeries}
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading planters data</div>;
  }
} 