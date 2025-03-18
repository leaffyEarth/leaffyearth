// src/utils/planterVariantsApi.ts
import { api } from '@/services/api';
import { AvailablePlanterVariant } from '@/types/plants.types';
import { PlantResponseData } from '@/types/response.types';


interface UpdatePlanterVariant {
    images?: string[]; // Optional: Only include if updating images
}
interface CreatePlanterVariant {
    planterSku: string;
    // Additional fields can be added here if needed
}




// Fetch all available planter variants
export const fetchAvailablePlanterVariants = async (): Promise<AvailablePlanterVariant[]> => {
    const response = await api.get('plants/planter-variants');
    return response.data;
};

// Add a new planter variant to a plant
export const addPlanterVariant = async (plantId: string, data: CreatePlanterVariant): Promise<PlantResponseData> => {
    const response = await api.post(`/plants/${plantId}/planter-variants`, data);
    return response.data;
};

// Delete a planter variant from a plant
export const deletePlanterVariant = async (plantId: string, planterSku: string): Promise<void> => {
    await api.delete(`/plants/${plantId}/planter-variants/${planterSku}`);
};

// Upload image to a planter variant
export const uploadPlanterVariantImage = async (plantId: string, planterSku: string, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file);

    await api.post(`/plants/${plantId}/planter-variants/${planterSku}/upload-image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Update a planter variant (e.g., delete an image)
export const updatePlanterVariant = async (plantId: string, planterSku: string, data: UpdatePlanterVariant): Promise<void> => {
    await api.patch(`/plants/${plantId}/planter-variant/${planterSku}`, data);
};
