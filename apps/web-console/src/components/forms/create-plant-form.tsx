"use client"

import { useState, useEffect } from "react"
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
import { createPlantSchema, type CreatePlantInput } from "@/lib/validations/plant"
import { createPlant, getPlantSeries } from "@/services/plant-service"
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

interface PlantSeries {
  id: string
  name: string
  count: number
}

export function CreatePlantForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [plantSeries, setPlantSeries] = useState<PlantSeries[]>([])
  const [isLoadingSeries, setIsLoadingSeries] = useState(false)
  const [showNewSeriesInput, setShowNewSeriesInput] = useState(false)

  useEffect(() => {
    async function loadPlantSeries() {
      try {
        setIsLoadingSeries(true)
        const series = await getPlantSeries()
        setPlantSeries(series)
      } catch (error) {
        toast.error("Failed to load plant series")
      } finally {
        setIsLoadingSeries(false)
      }
    }

    loadPlantSeries()
  }, [])

  const form = useForm<CreatePlantInput>({
    resolver: zodResolver(createPlantSchema),
    defaultValues: {
      name: "",
      plantSeries: "",
      description: "",
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      price: 0,
      size: undefined,
      type: [],
      lightExposure: undefined,
      idealLocation: [],
      maintenance: undefined,
      watering: undefined,
    },
  })

  async function onSubmit(data: CreatePlantInput) {
    try {
      setIsLoading(true)
      await createPlant(data)
      toast.success("Plant created successfully")
      router.push("/products/plants")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create plant")
    } finally {
      setIsLoading(false)
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
                  <Input placeholder="Enter plant name" {...field} />
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
                <Select
                  onValueChange={(value: string) => {
                    if (value === "new") {
                      setShowNewSeriesInput(true)
                      field.onChange("")
                    } else {
                      setShowNewSeriesInput(false)
                      field.onChange(value)
                    }
                  }}
                  value={showNewSeriesInput ? "new" : field.value}
                  disabled={isLoadingSeries}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select or enter plant series" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="new">Enter new series</SelectItem>
                    {plantSeries.map((series) => (
                      <SelectItem key={series.id} value={series.id}>
                        {series.name} ({series.count} plants)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showNewSeriesInput && (
                  <Input
                    placeholder="Enter new plant series"
                    onChange={(e) => field.onChange(e.target.value)}
                    className="mt-2"
                  />
                )}
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
                    onChange={(values) => {
                      field.onChange(values)
                    }}
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
                    onChange={(values) => {
                      field.onChange(values)
                    }}
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

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Plant"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 