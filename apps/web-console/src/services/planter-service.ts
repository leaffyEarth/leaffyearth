import { IPlanter, IPlantersResponse, ICreatePlanterDto } from "@/types/planters"
import { CreatePlanterInput } from "@/lib/validations/planter"
import { getAuthToken } from "./auth-service"

export async function getPlanters(page = 1, limit = 15): Promise<IPlantersResponse> {
  try {
    const response = await fetch(`/api/planters?page=${page}&limit=${limit}`, {
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching planters:", error)
    throw error
  }
}

export async function getPlanterById(id: string): Promise<IPlanter> {
  try {
    const response = await fetch(`/api/planters/${id}`, {
      credentials: "include",
    })
    
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch planter")
    }

    return data
  } catch (error) {
    console.error("Error fetching planter:", error)
    throw error
  }
}

export async function createPlanter(planterData: CreatePlanterInput): Promise<IPlanter> {
  try {
    const response = await fetch(`/api/planters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(planterData),
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        Array.isArray(error.message) 
          ? error.message.join(", ") 
          : error.message || "Failed to create planter"
      )
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error("Error creating planter:", error)
    throw error
  }
}

export async function updatePlanter(id: string, planterData: Partial<CreatePlanterInput>): Promise<IPlanter> {
  try {
    const response = await fetch(`/api/planters/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(planterData),
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to update planter")
    }

    return response.json()
  } catch (error) {
    console.error("Error updating planter:", error)
    throw error
  }
}

export async function uploadPlanterImage(id: string, file: File): Promise<IPlanter> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`/api/planters/${id}/upload-image`, {
      method: 'POST',
      body: formData,
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to upload image')
    }

    return response.json()
  } catch (error) {
    console.error('Error uploading planter image:', error)
    throw error
  }
}

export async function deletePlanterImage(id: string, imageUrl: string): Promise<IPlanter> {
  try {
    const segments = imageUrl.split('/')
    const imageId = segments[segments.length - 1]
    
    const response = await fetch(`/api/planters/${id}/images/${imageId}`, {
      method: 'DELETE',
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete image')
    }

    return response.json()
  } catch (error) {
    console.error('Error deleting planter image:', error)
    throw error
  }
}

export async function getPlanterSeries() {
  const response = await fetch("/api/planters/series")
  if (!response.ok) {
    throw new Error("Failed to fetch planter series")
  }
  return response.json()
}

export async function deletePlanter(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/planters/${id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to delete planter")
    }
  } catch (error) {
    console.error("Error deleting planter:", error)
    throw error
  }
} 