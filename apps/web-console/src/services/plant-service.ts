import { IPlant, IPlantsResponse } from "@/types/plants"
import { CreatePlantInput } from "@/lib/validations/plant"

export async function getPlants(page = 1, limit = 15): Promise<IPlantsResponse> {
  try {
    const response = await fetch(`/api/plants?page=${page}&limit=${limit}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching plants:", error)
    throw error
  }
}

export async function getPlantById(id: string): Promise<IPlant> {
  try {
    const response = await fetch(`/api/plants/${id}`)
    
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch plant")
    }

    return data
  } catch (error) {
    console.error("Error fetching plant:", error)
    throw error
  }
}

export async function createPlant(plantData: CreatePlantInput): Promise<IPlant> {
  try {
    const response = await fetch("/api/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(
        Array.isArray(data.message) 
          ? data.message.join(", ") 
          : data.message || "Failed to create plant"
      )
    }

    return data
  } catch (error) {
    console.error("Error creating plant:", error)
    throw error
  }
}

export async function updatePlant(id: string, plantData: Partial<CreatePlantInput>): Promise<IPlant> {
  try {
    const response = await fetch(`/api/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to update plant")
    }

    return response.json()
  } catch (error) {
    console.error("Error updating plant:", error)
    throw error
  }
}

export async function uploadPlantImage(id: string, file: File): Promise<IPlant> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`/api/plants/${id}/upload-image`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to upload image')
    }

    return response.json()
  } catch (error) {
    console.error('Error uploading plant image:', error)
    throw error
  }
}

export async function deletePlantImage(id: string, imageUrl: string): Promise<IPlant> {
  try {
    // Extract the image ID from the URL
    const segments = imageUrl.split('/')
    const imageId = segments[segments.length - 1]
    
    const response = await fetch(`/api/plants/${id}/images/${imageId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete image')
    }

    return response.json()
  } catch (error) {
    console.error('Error deleting plant image:', error)
    throw error
  }
}

export async function getPlantSeries() {
  const response = await fetch("/api/plants/series")
  if (!response.ok) {
    throw new Error("Failed to fetch plant series")
  }
  return response.json()
}

export async function getPlantersForVariant(params?: {
  search?: string
  page?: number
  limit?: number
  fields?: string
}) {
  const searchParams = new URLSearchParams()
  
  if (params?.search) {
    searchParams.append("search", params.search)
  }
  if (params?.page) {
    searchParams.append("page", params.page.toString())
  }
  if (params?.limit) {
    searchParams.append("limit", params.limit.toString())
  }
  if (params?.fields) {
    searchParams.append("fields", params.fields)
  }

  const queryString = searchParams.toString()
  const response = await fetch(`/api/planters${queryString ? `?${queryString}` : ""}`)
  
  if (!response.ok) {
    throw new Error("Failed to fetch planters")
  }  
  return response.json()
}

export async function addPlanterVariant(plantId: string, planterId: string) {
  const response = await fetch(`/api/plants/${plantId}/planter-variants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ planter: planterId }),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to add planter variant")
  }

  return response.json()
}

export async function deletePlanterVariant(plantId: string, planterId: string) {
  const response = await fetch(`/api/plants/${plantId}/planter-variants/${planterId}`, {
    method: "DELETE",
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to delete planter variant")
  }
}

export async function uploadPlanterVariantImage(plantId: string, planterId: string, file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`/api/plants/${plantId}/planter-variants/${planterId}/upload-image`, {
    method: "POST",
    body: formData,
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to upload planter variant image")
  }

  return response.json()
}

export async function updatePlanterVariant(plantId: string, planterId: string, data: { images?: string[] }) {
  const response = await fetch(`/api/plants/${plantId}/planter-variants/${planterId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update planter variant")
  }

  return response.json()
}

export async function deletePlant(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/plants/${id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to delete plant")
    }
  } catch (error) {
    console.error("Error deleting plant:", error)
    throw error
  }
} 