"use client"

import { usePlants } from '@/hooks/queries/use-plants'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '@/lib/utils'
import { IPlant } from '@/types/plants'
import { useEffect } from 'react'
import { AlertCircle, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function PlantsPage() {
  const router = useRouter()
  const { data, isLoading, isError, error, isFetching, refetch } = usePlants()

  useEffect(() => {
    console.log('PlantsPage render state:', {
      isLoading,
      isError,
      error,
      data,
      isFetching
    })
  }, [isLoading, isError, error, data, isFetching])

  if (isLoading || isFetching) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Plant Catalog</h1>
          <Button
            onClick={() => router.push('/products/plants/create')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Plant
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 mt-4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Plant Catalog</h1>
          <Button
            onClick={() => router.push('/products/plants/create')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Plant
          </Button>
        </div>
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Plants</h2>
            <p className="text-gray-600 mb-4">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => refetch()}
                variant="default"
              >
                Try Again
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const plants = data?.data || []

  if (plants.length === 0) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Plant Catalog</h1>
          <Button
            onClick={() => router.push('/products/plants/create')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Plant
          </Button>
        </div>
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <div className="text-center">
            <h2 className="text-xl font-semibold">No Plants Available</h2>
            <p className="text-gray-600 mt-2">Add your first plant to get started</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Plant Catalog</h1>
        <Button
          onClick={() => router.push('/products/plants/create')}
          className="gap-2"
        >
          <Plus className="h-4 w-4" /> Add Plant
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {plants.map((plant: IPlant) => (
          <div 
            key={plant._id} 
            className="rounded-lg border p-4 flex flex-col transition-all duration-200 hover:shadow-lg cursor-pointer hover:border-primary"
            onClick={() => router.push(`/products/plants/${plant._id}`)}
          >
            <div className="relative aspect-square">
              <img
                src={plant.images?.[0] || '/placeholder-plant.jpg'}
                alt={plant.name}
                className="object-cover rounded-md w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold mt-3 line-clamp-1">{plant.name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{plant.description}</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {plant.plantSeries}
              </Badge>
            </div>
            <div className="flex justify-between items-center mt-auto pt-4">
              <span className="text-lg font-bold">
                {formatCurrency(plant.price)}
              </span>
              <span className="text-sm text-gray-500">
                {plant.size}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 