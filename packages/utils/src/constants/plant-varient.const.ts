import { BiodegradablePlanters, CeramicPlanters, MetalPlanters, planterCategoryEnum, PlanticPlanters, TerracottaPlanters, WoodenPlanters } from "../enums/planters-series.enum";


export interface PlanterVariantType {
    planterSku: string;
    planterName: TerracottaPlanters | CeramicPlanters | PlanticPlanters | MetalPlanters | WoodenPlanters | BiodegradablePlanters;
    planterSeries: planterCategoryEnum;
    thumbnail: string;
    price: number;
    color: { hex: string, name: string }
}


export const PlanterVariants: PlanterVariantType[] = [
    // Terracotta Planters
    // Spring Planter
    {
        planterSku: 'terracottaseries_spring_brown',
        thumbnail: 'picture',
        planterName: TerracottaPlanters.springPlanter,
        planterSeries: planterCategoryEnum.terracotta_Planters,
        price: 300,
        color: { hex: '#964B00', name: 'brown' }
    },

    // Zigzag Planter
    {
        planterSku: 'terracottaseries_zidzag_brown',
        thumbnail: 'https://leaffystorage.blob.core.windows.net/public/terracottaseries_zidzag_brown.png',
        planterName: TerracottaPlanters.zigzagPlanter,
        planterSeries: planterCategoryEnum.terracotta_Planters,
        price: 300,
        color: { hex: '#964B00', name: 'brown' }
    },
    {
        planterSku: 'terracottaseries_zidzag_white',
        thumbnail: 'https://leaffystorage.blob.core.windows.net/public/terracottaseries_zidzag_white.png',
        planterName: TerracottaPlanters.zigzagPlanter,
        planterSeries: planterCategoryEnum.terracotta_Planters,
        price: 300,
        color: { hex: '#ffffff', name: 'white' }
    },

    // Ceramic Planters
    // Blushing Sun Planter
    {
        planterSku: 'ceramicseries_blumshingsun_white',
        thumbnail: 'picture',
        planterName: CeramicPlanters.blushingSunPlanter,
        planterSeries: planterCategoryEnum.ceramic_planters,
        price: 600,
        color: { hex: '#ffffff', name: 'white' }
    },

    // Balmy Waves Planter
    {
        planterSku: 'ceramicseries_balmywaves_white',
        thumbnail: 'picture',
        planterName: CeramicPlanters.balmyWavesPlanter,
        planterSeries: planterCategoryEnum.ceramic_planters,
        price: 600,
        color: { hex: '#ffffff', name: 'white' }
    },

    // Pheonix Planter
    {
        planterSku: 'ceramicseries_pheonix_white',
        thumbnail: 'picture',
        planterName: CeramicPlanters.PheonixPlanter,
        planterSeries: planterCategoryEnum.ceramic_planters,
        price: 650,
        color: { hex: '#ffffff', name: 'white' }
    },

    // Plastic Planters
    // Modern Grace Planter
    {
        planterSku: 'plasticseries_moderngrace_black',
        thumbnail: 'picture',
        planterName: PlanticPlanters.modernGracePlanter,
        planterSeries: planterCategoryEnum.plastic_planters,
        price: 250,
        color: { hex: '#000000', name: 'white' }
    },

    // Ribbed Lanter
    {
        planterSku: 'plasticseries_ribbedlander_black',
        thumbnail: 'picture',
        planterName: PlanticPlanters.ribbedlanter,
        planterSeries: planterCategoryEnum.plastic_planters,
        price: 400,
        color: { hex: '#000000', name: 'white' }
    },

    // Metal Planters
    // Brass Noor Planter
    {
        planterSku: 'metalseries_brassnoor_white',
        thumbnail: 'picture',
        planterName: MetalPlanters.brassNoorPlanter,
        planterSeries: planterCategoryEnum.metal_planters,
        price: 800,
        color: { hex: '#ffffff', name: 'white' }
    },

    // Gold Glamour Planter
    {
        planterSku: 'metalseries_goldglamour_brown',
        thumbnail: 'picture',
        planterName: MetalPlanters.goldGlamourPlanter,
        planterSeries: planterCategoryEnum.metal_planters,
        price: 850,
        color: { hex: '#964B00', name: 'brown' }
    },

    // Wooden Planters
    // Gradient Planter
    {
        planterSku: 'woodenseries_gradient_brown',
        thumbnail: 'picture',
        planterName: WoodenPlanters.gradientPlanter,
        planterSeries: planterCategoryEnum.wooden_planters,
        price: 950,
        color: { hex: '#964B00', name: 'brown' }
    },

    // Orbit Planter
    {
        planterSku: 'woodenseries_orbit_brown',
        thumbnail: 'picture',
        planterName: WoodenPlanters.orbitPlanter,
        planterSeries: planterCategoryEnum.wooden_planters,
        price: 750,
        color: { hex: '#964B00', name: 'brown' }
    },

    // Ridged Waves Planter
    {
        planterSku: 'woodenseries_ridgedwaves_brown',
        thumbnail: 'picture',
        planterName: WoodenPlanters.ridgedWavesPlanters,
        planterSeries: planterCategoryEnum.wooden_planters,
        price: 750,
        color: { hex: '#964B00', name: 'brown' }
    },

    // Biodegradable Planters
    // Brown Jute Planter
    {
        planterSku: 'woodenseries_brownjute_white',
        thumbnail: 'picture',
        planterName: BiodegradablePlanters.brownJutePlanter,
        planterSeries: planterCategoryEnum.biodegradable_planters,
        price: 850,
        color: { hex: '#ffffff', name: 'white' }
    },

    // Coco Planters
    {
        planterSku: 'woodenseries_coco_white',
        thumbnail: 'picture',
        planterName: BiodegradablePlanters.cocoPlanters,
        planterSeries: planterCategoryEnum.biodegradable_planters,
        price: 850,
        color: { hex: '#ffffff', name: 'white' }
    },
];