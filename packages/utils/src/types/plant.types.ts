
export interface Dimension {
    length: number;
    width: number;
    height: number;
}

export interface Plant {
    _id: string;
    name: string;
    plantSeries: string;
    description: string;
    size: "small" | "medium" | "large" | "extra-large";
    dimensions: Dimension;
    price: number;
    sku: string;
    images: string[];
    createdAt?: string;
    updatedAt?: string;
    type: string;
    lightExposure: string;
    idealLocation: string;
    maintenance: string;
    watering: string;
    tags: string[];
}

export interface catalogInPlant {
    _id: string;
    size: string;
    name: string;
    description: string;
    thumbnail: string;
    images: string[],
    price: number,
    sku: string,
    planterVariants: PlanterVariant[];
}

export interface catalogPlantResponse {
    _id: string;
    plants: catalogInPlant[],
    count: number
}

export interface PlantsCatalogReponse {
    data: catalogPlantResponse[],
    page: number;
    limit: number;
    total: number
}

export interface PlanterVariant {
    planterSku: string;
    images: string[];
}
