"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { partnerSchema, type PartnerFormValues } from "@/lib/validations/partner"
import { updatePartner } from "@/services/partner-service"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLocations } from "@/hooks/use-locations"
import { IPartner } from "@/types/partners"
import { Switch } from "@/components/ui/switch"

interface EditPartnerFormProps {
  partner: IPartner
}

export function EditPartnerForm({ partner }: EditPartnerFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { locations, isLoading: isLoadingLocations } = useLocations()

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      partnerId: partner.partnerId,
      name: partner.name,
      ownerName: partner.ownerName,
      primaryPhoneNumber: partner.primaryPhoneNumber,
      secondaryPhoneNumber: partner.secondaryPhoneNumber || null,
      email: partner.email || null,
      region: partner.region || null,
      address: partner.address,
      location: partner.location._id,
      latitude: partner.latitude,
      longitude: partner.longitude,
      isActive: partner.isActive,
    },
  })

  async function onSubmit(data: PartnerFormValues) {
    try {
      setIsLoading(true)
      await updatePartner(partner._id, data)
      toast.success("Partner updated successfully")
      setIsEditing(false)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update partner")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsEditing(!isEditing)}
            disabled={isLoading}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="partnerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Partner ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter partner ID" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter partner name" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter owner name" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input placeholder="Enter region" {...field} value={field.value || ""} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="primaryPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter primary phone number" {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondaryPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter secondary phone number" {...field} value={field.value || ""} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} value={field.value || ""} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!isEditing}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location._id} value={location._id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="any"
                    placeholder="Enter latitude" 
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="any"
                    placeholder="Enter longitude" 
                    {...field}
                    onChange={e => field.onChange(parseFloat(e.target.value))}
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Status</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Set whether this partner is active or not
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!isEditing}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {isEditing && (
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Partner"}
          </Button>
        )}
      </form>
    </Form>
  )
} 