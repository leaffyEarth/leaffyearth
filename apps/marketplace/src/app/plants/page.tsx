import PlantHero from './sections/PlantHero/PlantHero';
import { plantApi } from '@/lib/api/plantApi';
import PlantCatalogClientSide from "./sections/PlantCatalog/PlantCatalogClientSide"

export default async function PlantsPage() {
  try {
    const [plantsData, plantsSeries] = await Promise.all([
      plantApi.getPlants(1, 12, undefined, {
        cache: 'no-cache'
      }),
      plantApi.getAllPlantSeries({
        cache: 'force-cache'
      })
    ]);
    return (
      <main>
        <PlantHero />
        <PlantCatalogClientSide 
          initialPlants={plantsData}
          initialSeries={plantsSeries}
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return <div>Error loading plants data</div>;
  }
} 