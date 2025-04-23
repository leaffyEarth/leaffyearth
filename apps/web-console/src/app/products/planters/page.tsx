"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import { Edit, Plus } from "lucide-react"
import Image from "next/image"
import { usePlanters } from "@/hooks/use-planters"

export default function PlantersPage() {
  const router = useRouter()
  const {
    planters,
    isLoading,
    error,
    page,
    setPage,
    totalPages,
  } = usePlanters()

  if (isLoading) {
    return <Loader text="Loading planters..." />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Planters</h1>
        <Button onClick={() => router.push("/products/planters/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Planter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {planters.map((planter) => (
          <div
            key={planter._id}
            className="group relative bg-card rounded-lg border overflow-hidden"
          >
            <div className="aspect-square relative">
              <Image
                src={planter.images[0] || '/placeholder-planter.jpg'}
                alt={planter.name}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => router.push(`/products/planters/${planter._id}`)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold truncate">{planter.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {planter.description}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-semibold">₹{planter.price}</span>
                <span className="text-sm text-muted-foreground capitalize">
                  {planter.size}
                </span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                SKU: {planter.sku}
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
} 