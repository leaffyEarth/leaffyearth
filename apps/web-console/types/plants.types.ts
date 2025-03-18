export interface Plant {
    _id: string;
    name: string;
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
    planterVariants: plantVariantType[];

}


export interface plantVariantType {
    planterSku: string;
    images: string[];
}


export interface Dimension {
    length: number;
    width: number;
    height: number;
}



export interface catalogInPlant {
    _id: string;
    size: string;
    thumbnail: string;
    images: string[],
    price: number,
    sku: string
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


export interface AvailablePlanterVariant {
    planterSku: string;
    planterName: string;
    planterSeries: string;
    size: "small" | "medium" | "large" | "extra-large";
    color: { hex: string, name: string };
}


export interface PlantFamilyReponse {
    _id: string;
    totalCount: number
}
