
export interface Planter {
    _id: string;
    name: string;
    description: string;
    size: "small" | "medium" | "large" | "extra-large";
    color: string;
    dimensions: Dimension;
    price: number;
    sku: string;
    images: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface Dimension {
    length: number;
    width: number;
    height: number;
}
