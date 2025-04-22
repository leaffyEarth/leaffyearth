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
} from "@/components/ui/alert-dialog"
import { createPlanterSchema, type CreatePlanterInput } from "@/lib/validations/planter"
import { updatePlanter } from "@/services/planter-service"
import { IPlanter, PlanterSizeEnum, PlanterCategoryEnum } from "@/types/planters"

interface EditPlanterFormProps {
  planter: IPlanter
}

export function EditPlanterForm({ planter }: EditPlanterFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [pendingData, setPendingData] = useState<CreatePlanterInput | null>(null)
  console.log("planter", planter)
  const defaultValues: CreatePlanterInput = {
    name: planter.name,
    planterCategory: planter.planterCategory,
    planterSeries: planter.planterSeries,
    description: planter.description,
    size: planter.size as PlanterSizeEnum,
    dimensions: {
      length: planter.dimensions?.length ?? 0,
      width: planter.dimensions?.width ?? 0,
      height: planter.dimensions?.height ?? 0,
    },
    color: planter.color,
    price: planter.price,
  }

  const form = useForm<CreatePlanterInput>({
    resolver: zodResolver(createPlanterSchema),
    defaultValues,
  })

  async function onSubmit(data: CreatePlanterInput) {
    setPendingData(data)
  }

  async function handleConfirmedUpdate() {
    if (!pendingData) return

    try {
      setIsLoading(true)
      const { name, ...updateData } = pendingData
      await updatePlanter(planter._id, updateData)
      toast.success("Planter updated successfully")
      router.push("/products/planters")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update planter")
    } finally {
      setIsLoading(false)
      setPendingData(null)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter planter name" {...field} disabled />
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
            name="planterSeries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Series</FormLabel>
                <FormControl>
                  <Input placeholder="Enter planter series" {...field} disabled />
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
                  placeholder="Enter planter description"
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

        <div className="grid grid-cols-2 gap-6">
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

        <AlertDialog open={!!pendingData} onOpenChange={(open) => !open && setPendingData(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Update Planter</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update this planter? This action will modify the planter's details.
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
          {isLoading ? "Updating..." : "Update Planter"}
        </Button>
      </form>
    </Form>
  )
} 