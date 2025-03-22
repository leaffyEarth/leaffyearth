import { Planter } from "./planters.types";
import { Dimension, Plant } from "./plants.types";
import { User } from "./users.types";

export interface PlantsResponseData {
    data: Plant[];
    page: number;
    limit: number;
    total: number;
}

export interface PlantersResponseData {
    data: Planter[];
    page: number;
    limit: number;
    total: number;
}



export interface UsersResponseData {
    data: User[];  // The actual array of users
    page: number;  // The current page (1-based) from the server
    limit: number; // The number of items per page
    total: number; // Total number of users in the database
}


export interface plantVariantType {
    planterSku: string;
    images: string[];
}

export interface PlantResponseData {
    _id: string;
    name: string;
    plantSeries: string;
    description: string;
    size: string;
    dimensions: Dimension;
    price: number;
    sku: string;
    createdAt: string;
    updatedAt: string;
    images: string[];
    thumbnail: string;
    type: string[];
    lightExposure: string;
    idealLocation: string[];
    maintenance: string;
    watering: string;
    tags: string[];
    planterVariants: plantVariantType[];

}
