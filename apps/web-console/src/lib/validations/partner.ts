import { z } from "zod"

export const partnerSchema = z.object({
  partnerId: z.string().min(1, "Partner ID is required"),
  name: z.string().min(1, "Name is required"),
  ownerName: z.string().min(1, "Owner name is required"),
  primaryPhoneNumber: z.string().min(1, "Primary phone number is required"),
  secondaryPhoneNumber: z.string().optional().nullable(),
  email: z.string().email("Invalid email format").optional().nullable(),
  region: z.string().optional().nullable(),
  address: z.string().min(1, "Address is required"),
  location: z.string().min(1, "Location is required"),
  latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
  isActive: z.boolean(),
})

export type PartnerFormValues = z.infer<typeof partnerSchema>
