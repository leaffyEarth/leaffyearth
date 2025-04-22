import { z } from "zod";
import {
  PlantSizeEnum,
  PlantTypeEnum,
  PlantLightExposureTypeEnum,
  PlantIdealLocationTypeEnum,
  PlantMaintenanceTypeEnum,
  PlantWateringTypeEnum,
  PlantTagsTypeEnum,
} from "@/types/plants/enums";

export const createPlantSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  plantSeries: z.string().min(3, "Plant series must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  size: z.nativeEnum(PlantSizeEnum, { required_error: "Size is required" }),
  dimensions: z.object({
    length: z.number().min(1, "Length must be greater than 0"),
    width: z.number().min(1, "Width must be greater than 0"),
    height: z.number().min(1, "Height must be greater than 0"),
  }, { required_error: "Dimensions are required" }),
  price: z.number().min(1, "Price must be greater than 0"),
  type: z.array(z.nativeEnum(PlantTypeEnum), { required_error: "At least one plant type is required" }).min(1, "At least one plant type is required"),
  lightExposure: z.nativeEnum(PlantLightExposureTypeEnum, { required_error: "Light exposure is required" }),
  idealLocation: z.array(z.nativeEnum(PlantIdealLocationTypeEnum), { required_error: "At least one ideal location is required" }).min(1, "At least one ideal location is required"),
  maintenance: z.nativeEnum(PlantMaintenanceTypeEnum, { required_error: "Maintenance type is required" }),
  watering: z.nativeEnum(PlantWateringTypeEnum, { required_error: "Watering type is required" }),
});

export type CreatePlantInput = z.infer<typeof createPlantSchema>; 