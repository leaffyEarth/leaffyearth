import { GroupedPlanterSeries, PlanterVariantType, PlantPlanterVarients_colorType, PlantPlanterVarientsType } from "../../../../types/plants.types";




function createMasterMap(
    masterData: PlantPlanterVarientsType[],
): Map<string, PlantPlanterVarientsType> {
    const map = new Map<string, PlantPlanterVarientsType>();
    for (const item of masterData) {
        map.set(item.planterSku, item);
    }
    return map;
}

export function groupPlanterVariants(
    plantVariants: PlanterVariantType[],
    masterData: PlantPlanterVarientsType[],
  ): GroupedPlanterSeries[] {

    const masterMap = createMasterMap(masterData);
  
    const seriesMap = new Map<
      string,
      Map<
        string,
        Map<
          string,
          {
            planterSku: string;
            color: PlantPlanterVarients_colorType;
            price: number;
            thumbnail: string;
            images: Set<string>;
          }
        >
      >
    >();
  
    // 3. Combine & Group
    for (const pv of plantVariants) {
      const { planterSku, images } = pv;
      const masterItem = masterMap.get(planterSku);
      if (!masterItem) {
        continue;
      }
  
      const { planterSeries, planterName, color, price, thumbnail } = masterItem;
  
      // Ensure the top-level entry for this series
      if (!seriesMap.has(planterSeries)) {
        seriesMap.set(planterSeries, new Map());
      }
      const nameMap = seriesMap.get(planterSeries)!;
  
      // Ensure the sub-level entry for this planterName
      if (!nameMap.has(planterName)) {
        nameMap.set(planterName, new Map());
      }
      const skuMap = nameMap.get(planterName)!;
  
      // Ensure aggregator for this specific SKU
      if (!skuMap.has(planterSku)) {
        skuMap.set(planterSku, {
          planterSku,
          color,
          price,
          thumbnail,
          images: new Set<string>(),
        });
      }
      const aggregator = skuMap.get(planterSku)!;
  
      // Add the images from the plant variant
      for (const img of images) {
        aggregator.images.add(img);
      }
    }
  
    // 4. Convert the nested structure into GroupedPlanterSeries[]
    const result: GroupedPlanterSeries[] = [];
  
    for (const [planterSeries, nameMap] of seriesMap.entries()) {
      // Each series has an array of planters
      const plantersArray: GroupedPlanterSeries['planters'] = [];
  
      for (const [planterName, skuMap] of nameMap.entries()) {
        // Convert each aggregator to a variant object
        const variantArray = Array.from(skuMap.values()).map((aggr) => ({
          planterSku: aggr.planterSku,
          color: aggr.color,
          price: aggr.price,
          thumbnail: aggr.thumbnail,
          images: Array.from(aggr.images),
        }));
  
        plantersArray.push({
          planterName,
          variant: variantArray,
        });
      }
  
      result.push({
        planterSeries,
        planters: plantersArray,
      });
    }
  
    return result;
  }