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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createPlanterSchema, type CreatePlanterInput } from "@/lib/validations/planter"
import { createPlanter, getPlanterSeries } from "@/services/planter-service"
import { PlanterCategoryEnum, PlanterSizeEnum } from "@/types/planters"

interface PlanterSeries {
  id: string
  name: string
  count: number
}

export function CreatePlanterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [planterSeries, setPlanterSeries] = useState<PlanterSeries[]>([])
  const [isLoadingSeries, setIsLoadingSeries] = useState(false)
  const [showNewSeriesInput, setShowNewSeriesInput] = useState(false)

  useEffect(() => {
    async function loadPlanterSeries() {
      try {
        setIsLoadingSeries(true)
        const series = await getPlanterSeries()
        setPlanterSeries(series)
      } catch (error) {
        toast.error("Failed to load planter series")
      } finally {
        setIsLoadingSeries(false)
      }
    }

    loadPlanterSeries()
  }, [])

  const form = useForm<CreatePlanterInput>({
    resolver: zodResolver(createPlanterSchema),
    defaultValues: {
      name: "",
      planterCategory: undefined,
      planterSeries: "",
      description: "",
      size: undefined,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      color: {
        hex: "#000000",
        name: "Black",
      },
      price: 0,
    },
  })

  async function onSubmit(data: CreatePlanterInput) {
    try {
      setIsLoading(true)
      await createPlanter(data)
      toast.success("Planter created successfully")
      router.push("/products/planters")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create planter")
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
                  <Input placeholder="Enter planter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="planterSeries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Planter Series</FormLabel>
                <Select
                  onValueChange={(value) => {
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
                      <SelectValue placeholder="Select or enter planter series" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="new">Enter new series</SelectItem>
                    {planterSeries.map((series) => (
                      <SelectItem key={series.id} value={series.id}>
                        {series.name} ({series.count} planters)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showNewSeriesInput && (
                  <Input
                    placeholder="Enter new planter series"
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
                  placeholder="Enter planter description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="planterCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(PlanterCategoryEnum).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {key.replace(/_/g, ' ')}
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
                    {Object.entries(PlanterSizeEnum).map(([key, value]) => (
                      <SelectItem key={value} value={value}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="color.hex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color (Hex)</FormLabel>
                <FormControl>
                  <Input 
                    type="color"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter color name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Planter"}
          </Button>
        </div>
      </form>
    </Form>
  )
} 