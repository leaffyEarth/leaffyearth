import { ILocation, ILocationsResponse } from "@/types/locations";
import { LocationFormValues } from "@/lib/validations/location";

export async function getLocations(page: number = 1, limit: number = 10): Promise<ILocationsResponse> {
  const response = await fetch(`/api/locations?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }
  return response.json();
}

export async function getLocationById(id: string): Promise<ILocation> {
  const response = await fetch(`/api/locations/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch location');
  }
  return response.json();
}

export async function createLocation(data: LocationFormValues) {
  const response = await fetch("/api/locations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to create location")
  }

  return response.json()
}

export async function updateLocation(id: string, data: LocationFormValues) {
  const response = await fetch(`/api/locations/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update location")
  }

  return response.json()
} 

export async function deleteLocation(id: string) {
  const response = await fetch(`/api/locations/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to delete location")
  }

  return response.json()
}

