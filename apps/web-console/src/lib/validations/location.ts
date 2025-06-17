import { z } from "zod"

export const locationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  pincodes: z.array(z.string()).min(1, "At least one pincode is required"),
  description: z.string().optional(),
})

export type LocationFormValues = z.infer<typeof locationSchema>
