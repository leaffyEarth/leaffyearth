"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const locationFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  pincodes: z.string().min(1, {
    message: "At least one pincode is required.",
  }),
  description: z.string().optional(),
})

type LocationFormValues = z.infer<typeof locationFormSchema>

export function CreateLocationForm() {
  const router = useRouter()
  const form = useForm<LocationFormValues>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      name: "",
      pincodes: "",
      description: "",
    },
  })

  async function onSubmit(data: LocationFormValues) {
    try {
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          pincodes: data.pincodes.split(",").map(p => p.trim()),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create location")
      }

      toast.success("Location created successfully")
      router.push("/locations")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Bengaluru, Karnataka" {...field} />
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
                    placeholder="e.g., 560001, 560002, 560003" 
                    {...field} 
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
                    placeholder="Add a description for this location" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Create Location</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
} 