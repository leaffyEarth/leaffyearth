import { z } from "zod";
import { PlanterCategoryEnum, PlanterSizeEnum } from "@/types/planters";

export const createPlanterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  planterCategory: z.nativeEnum(PlanterCategoryEnum, { 
    required_error: "Planter category is required",
    invalid_type_error: "Invalid planter category"
  }),
  planterSeries: z.string().min(1, "Planter series is required"),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  size: z.nativeEnum(PlanterSizeEnum, { 
    required_error: "Size is required",
    invalid_type_error: "Invalid size"
  }),
  dimensions: z.object({
    length: z.number().min(0, "Length must be greater than or equal to 0"),
    width: z.number().min(0, "Width must be greater than or equal to 0"),
    height: z.number().min(0, "Height must be greater than or equal to 0"),
  }, { required_error: "Dimensions are required" }),
  color: z.object({
    hex: z.string().min(1, "Color hex is required"),
    name: z.string().min(1, "Color name is required"),
  }, { required_error: "Color is required" }),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
});

export type CreatePlanterInput = z.infer<typeof createPlanterSchema>; 