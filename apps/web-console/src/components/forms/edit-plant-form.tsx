"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
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
import { MultiSelect } from "@/components/ui/multi-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { createPlantSchema, type CreatePlantInput } from "@/lib/validations/plant"
import { updatePlant } from "@/services/plant-service"
import { IPlant } from "@/types/plants"
import {
  PlantTypeEnum,
  PlantLightExposureTypeEnum,
  PlantIdealLocationTypeEnum,
  PlantMaintenanceTypeEnum,
  PlantWateringTypeEnum,
  PlantSizeEnum,
} from "@/types/plants/enums"

const plantTypeOptions = Object.values(PlantTypeEnum).map((value) => ({
  label: value,
  value: value,
}))

const idealLocationOptions = Object.values(PlantIdealLocationTypeEnum).map((value) => ({
  label: value,
  value: value,
}))

interface EditPlantFormProps {
  plant: IPlant
}

export function EditPlantForm({ plant }: EditPlantFormProps) {
  const router = useRouter()
  const isEditing = !!plant
  const [isLoading, setIsLoading] = useState(false)
  const [pendingData, setPendingData] = useState<CreatePlantInput | null>(null)

  const defaultValues: CreatePlantInput = {
    name: plant.name,
    plantSeries: plant.plantSeries,
    description: plant.description,
    size: plant.size,
    dimensions: {
      length: plant.dimensions?.length ?? 0,
      width: plant.dimensions?.width ?? 0,
      height: plant.dimensions?.height ?? 0,
    },
    price: plant.price,
    type: plant.type,
    lightExposure: plant.lightExposure,
    idealLocation: plant.idealLocation,
    maintenance: plant.maintenance,
    watering: plant.watering,
  }

  const form = useForm<CreatePlantInput>({
    resolver: zodResolver(createPlantSchema),
    defaultValues,
  })

  async function onSubmit(data: CreatePlantInput) {
    setPendingData(data)
  }

  async function handleConfirmedUpdate() {
    if (!pendingData) return

    try {
      setIsLoading(true)
      const { name, plantSeries, ...updateData } = pendingData
      await updatePlant(plant._id, updateData)
      toast.success("Plant updated successfully")
      router.push("/products/plants")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update plant")
    } finally {
      setIsLoading(false)
      setPendingData(null)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter plant name" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plantSeries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plant Series</FormLabel>
                <FormControl>
                  <Input placeholder="Enter plant series" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter plant description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="dimensions.length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length (cm)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    {...field}
                    value={field.value || ''}
                    onChange={event => field.onChange(event.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dimensions.width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width (cm)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    {...field}
                    value={field.value || ''}
                    onChange={event => field.onChange(event.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dimensions.height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (cm)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    {...field}
                    value={field.value || ''}
                    onChange={event => field.onChange(event.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price in Rupees"
                    {...field}
                    value={field.value || ''}
                    onChange={event => field.onChange(event.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(PlantSizeEnum).map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={plantTypeOptions}
                    selected={field.value || []}
                    onChange={(values) => field.onChange(values)}
                    placeholder="Select types"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="lightExposure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Light Exposure</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select light exposure" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(PlantLightExposureTypeEnum).map((exposure) => (
                      <SelectItem key={exposure} value={exposure}>
                        {exposure}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idealLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ideal Location</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={idealLocationOptions}
                    selected={field.value || []}
                    onChange={(values) => field.onChange(values)}
                    placeholder="Select locations"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="maintenance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maintenance</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select maintenance level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(PlantMaintenanceTypeEnum).map((maintenance) => (
                      <SelectItem key={maintenance} value={maintenance}>
                        {maintenance}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="watering"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Watering</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select watering frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(PlantWateringTypeEnum).map((watering) => (
                      <SelectItem key={watering} value={watering}>
                        {watering}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <AlertDialog open={!!pendingData} onOpenChange={(open) => !open && setPendingData(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Plant</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update this plant? This action will modify the plant's details.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmedUpdate} disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Plant"}
        </Button>
      </form>
    </Form>
  )
} 