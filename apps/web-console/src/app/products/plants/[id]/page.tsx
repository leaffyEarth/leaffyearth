"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Trash2, Loader2 } from "lucide-react"
import { getPlantById, uploadPlantImage, deletePlantImage, getPlantersForVariant, addPlanterVariant, deletePlanterVariant, uploadPlanterVariantImage, deletePlant } from "@/services/plant-service"
import { EditPlantForm } from "@/components/forms/edit-plant-form"
import { Button } from "@/components/ui/button"
import { IPlant, IPlanterVariant } from "@/types/plants"
import { Loader } from "@/components/ui/loader"
import { toast } from "sonner"
import { UploadImage } from "@/components/ui/upload-image"
import Image from "next/image"
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
import { Combobox } from "@/components/ui/combobox"

export default function PlantPage() {
  const router = useRouter()
  const params = useParams()
  const [plant, setPlant] = useState<IPlant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageToDelete, setImageToDelete] = useState<string | null>(null)
  const [planters, setPlanters] = useState<{ id: string; name: string }[]>([])
  const [isLoadingPlanters, setIsLoadingPlanters] = useState(false)
  const [selectedPlanterId, setSelectedPlanterId] = useState<string>("")
  const [isAddingVariant, setIsAddingVariant] = useState(false)
  const [planterVariantToDelete, setPlanterVariantToDelete] = useState<string | null>(null)
  const [showAddVariantDialog, setShowAddVariantDialog] = useState(false)
  const [planterSearch, setPlanterSearch] = useState("")
  const [planterPage, setPlanterPage] = useState(1)
  const [totalPlanters, setTotalPlanters] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function loadPlant() {
      try {
        const data = await getPlantById(params.id as string)
        setPlant(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load plant")
      } finally {
        setIsLoading(false)
      }
    }

    loadPlant()
  }, [params.id])

  useEffect(() => {
    async function loadPlanters() {
      try {
        setIsLoadingPlanters(true)
        const data = await getPlantersForVariant({
          search: planterSearch,
          page: planterPage,
          limit: 25,
          fields: "name"
        })
        setPlanters(data.data.map((planter: any) => ({
          id: planter._id || planter.id,
          name: planter.name
        })))
        setTotalPlanters(data.total)

      } catch (error) {
        toast.error("Failed to load planters")
      } finally {
        setIsLoadingPlanters(false)
      }
    }

    loadPlanters()
  }, [planterSearch, planterPage])

  const handleImageUpload = async (file: File) => {
    try {
      const updatedPlant = await uploadPlantImage(params.id as string, file)
      setPlant(updatedPlant)
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload image')
      throw error
    }
  }

  const handleDeleteImage = async () => {
    if (!plant || !imageToDelete) return

    try {
      const updatedPlant = await deletePlantImage(params.id as string, imageToDelete)
      setPlant(updatedPlant)
      toast.success('Image deleted successfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete image')
    } finally {
      setImageToDelete(null)
    }
  }

  const handleAddPlanterVariant = async () => {
    if (!selectedPlanterId) return;
    
    try {
      setIsAddingVariant(true)
      const updatedPlant = await addPlanterVariant(params.id as string, selectedPlanterId)
      setPlant(updatedPlant)
      setSelectedPlanterId("")
      toast.success("Planter variant added successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add planter variant")
    } finally {
      setIsAddingVariant(false)
      setShowAddVariantDialog(false)
    }
  }

  const handleDeletePlanterVariant = async () => {
    if (!planterVariantToDelete) return;
    
    try {
      await deletePlanterVariant(params.id as string, planterVariantToDelete)
      setPlant((prev) => {
        if (!prev) return null
        return {
          ...prev,
          planterVariants: prev.planterVariants.filter((v: IPlanterVariant) => v.planter !== planterVariantToDelete),
        }
      })
      toast.success("Planter variant deleted successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete planter variant")
    } finally {
      setPlanterVariantToDelete(null)
    }
  }

  const handleUploadPlanterVariantImage = async (planterId: string, file: File) => {
    try {
      const updatedPlant = await uploadPlanterVariantImage(params.id as string, planterId, file)
      setPlant(updatedPlant)
      toast.success("Image uploaded successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image")
      throw error
    }
  }

  const handlePlanterSearch = (search: string) => {
    setPlanterSearch(search)
    setPlanterPage(1)
  }

  const handleDeletePlant = async () => {
    try {
      setIsDeleting(true)
      await deletePlant(params.id as string)
      toast.success("Plant deleted successfully")
      router.push("/products/plants")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete plant")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return <Loader text="Loading plant details..." />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!plant) {
    return <div>Plant not found</div>
  }

  const allImages = [
    ...(plant.thumbnail ? [plant.thumbnail] : []),
    ...(plant.images || [])
  ]

  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/products/plants")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Plants
        </Button>
        <h1 className="text-2xl font-bold">{plant.name}</h1>
      </div>

      <div className="space-y-8">
        {/* Edit Form Section */}
        <div className="bg-card p-6 rounded-lg border">
          <EditPlantForm plant={plant} />
        </div>

        {/* Images Grid Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Plant Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allImages.map((image, index) => (
              <div key={index} className="group relative aspect-square rounded-lg overflow-hidden border">
                <Image
                  src={image}
                  alt={`${plant.name} image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setImageToDelete(image)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    {/* <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Image</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this image? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setImageToDelete(null)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteImage}>
                          Delete
                        </AlertDialogAction> 
                      </AlertDialogFooter>
                    </AlertDialogContent>*/}
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Add more images to showcase different angles and details of the plant.
          </p>
          <UploadImage onUpload={handleImageUpload} />
        </div>

        {/* Planter Variants Section */}
        <div className="bg-muted p-6 rounded-lg space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Planter Variants</h2>
            <div className="flex items-center gap-4">
              <div className="w-[200px]">
                <Combobox
                  options={planters.map((planter) => ({
                    label: planter.name,
                    value: planter.id
                  }))}
                  value={selectedPlanterId}
                  onChange={setSelectedPlanterId}
                  placeholder="Select a planter"
                  disabled={isLoadingPlanters || isAddingVariant}
                  loading={isLoadingPlanters}
                  onSearch={handlePlanterSearch}
                />
              </div>
              <AlertDialog open={showAddVariantDialog} onOpenChange={setShowAddVariantDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={() => setShowAddVariantDialog(true)}
                    disabled={!selectedPlanterId || isAddingVariant}
                  >
                    {isAddingVariant ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add Variant"
                    )}
                  </Button>
                </AlertDialogTrigger>
                {/* <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Add Planter Variant</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to add this planter as a variant? This will create a new variant that can be customized with its own images.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setShowAddVariantDialog(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddPlanterVariant}>
                      Add Variant
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent> */}
              </AlertDialog>
            </div>
          </div>

          {plant?.planterVariants && plant.planterVariants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plant.planterVariants.map((variant: IPlanterVariant) => {
                const planter = planters.find((p) => p.id === variant.planter)
                return (
                  <div
                    key={variant.planter}
                    className="bg-card p-4 rounded-lg border space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{planter?.name || "Unknown Planter"}</h3>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => setPlanterVariantToDelete(variant.planter)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        {/* <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Planter Variant</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this planter variant? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setPlanterVariantToDelete(null)}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeletePlanterVariant}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent> */}
                      </AlertDialog>
                    </div>

                    {variant.images && variant.images.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {variant.images.map((image: string, index: number) => (
                          <div key={index} className="relative aspect-square">
                            <Image
                              src={image}
                              alt={`${planter?.name} variant image ${index + 1}`}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-4">
                        No images for this variant
                      </div>
                    )}

                    <UploadImage
                      onUpload={(file) => handleUploadPlanterVariantImage(variant.planter, file)}
                    />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No planter variants added yet
            </div>
          )}
        </div>

        {/* Delete Section */}
        <div className="bg-destructive/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Once you delete a plant, there is no going back. Please be certain.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Plant"
                  )}
                </Button>
              </AlertDialogTrigger>
              {/* <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the plant
                    and all associated data including images and planter variants.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeletePlant}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Delete Plant
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent> */}
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  )
} 