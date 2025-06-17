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
import { Textarea } from "@/components/ui/textarea"
import { locationSchema, type LocationFormValues } from "@/lib/validations/location"
import { updateLocation } from "@/services/location-service"
import { ILocation } from "@/types/locations"

interface EditLocationFormProps {
  location: ILocation
}

export function EditLocationForm({ location }: EditLocationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: location.name,
      pincodes: location.pincodes,
      description: location.description || "",
    },
  })

  async function onSubmit(data: LocationFormValues) {
    try {
      setIsLoading(true)
      await updateLocation(location._id, data)
      toast.success("Location updated successfully")
      setIsEditing(false)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update location")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter location name" {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pincodes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincodes</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter pincodes (comma-separated)"
                  onChange={(e) => {
                    const pincodes = e.target.value.split(",").map((p) => p.trim())
                    field.onChange(pincodes)
                  }}
                  value={field.value.join(", ")}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter location description"
                  className="resize-none"
                  {...field}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isEditing && (
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Location"}
          </Button>
        )}
      </form>
    </Form>
  )
} 