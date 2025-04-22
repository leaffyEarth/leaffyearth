"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Trash2, Loader2 } from "lucide-react"
import { getPlanterById, uploadPlanterImage, deletePlanterImage, deletePlanter } from "@/services/planter-service"
import { EditPlanterForm } from "@/components/forms/edit-planter-form"
import { Button } from "@/components/ui/button"
import { IPlanter } from "@/types/planters"
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

export default function PlanterPage() {
  const router = useRouter()
  const params = useParams()
  const [planter, setPlanter] = useState<IPlanter | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageToDelete, setImageToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function loadPlanter() {
      try {
        const data = await getPlanterById(params.id as string)
        setPlanter(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load planter")
      } finally {
        setIsLoading(false)
      }
    }

    loadPlanter()
  }, [params.id])

  const handleImageUpload = async (file: File) => {
    try {
      const updatedPlanter = await uploadPlanterImage(params.id as string, file)
      setPlanter(updatedPlanter)
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload image')
      throw error
    }
  }

  const handleDeleteImage = async () => {
    if (!planter || !imageToDelete) return

    try {
      const updatedPlanter = await deletePlanterImage(params.id as string, imageToDelete)
      setPlanter(updatedPlanter)
      toast.success('Image deleted successfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete image')
    } finally {
      setImageToDelete(null)
    }
  }

  const handleDeletePlanter = async () => {
    try {
      setIsDeleting(true)
      await deletePlanter(params.id as string)
      toast.success("Planter deleted successfully")
      router.push("/products/planters")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete planter")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return <Loader text="Loading planter details..." />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!planter) {
    return <div>Planter not found</div>
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => router.push("/products/planters")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Planters
        </Button>
        <h1 className="text-2xl font-bold">{planter.name}</h1>
      </div>

      <div className="space-y-8">
        {/* Edit Form Section */}
        <div className="bg-card p-6 rounded-lg border">
          <EditPlanterForm planter={planter} />
        </div>

        {/* Images Grid Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Planter Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {planter.images && planter.images.length > 0 ? (
              planter.images.map((image, index) => (
                <div key={index} className="group relative aspect-square rounded-lg overflow-hidden border">
                  <Image
                    src={image}
                    alt={`${planter.name} image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setImageToDelete(image)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No images available for this planter
              </div>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Add more images to showcase different angles and details of the planter.
          </p>
          <UploadImage onUpload={handleImageUpload} />
        </div>

        {/* Delete Section */}
        <div className="bg-destructive/5 p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Once you delete a planter, there is no going back. Please be certain.
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
                    "Delete Planter"
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the planter
                    and all associated data including images and variants.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeletePlanter}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Delete Planter
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Delete Image Confirmation Dialog */}
      <AlertDialog open={!!imageToDelete} onOpenChange={(open) => !open && setImageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteImage}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 