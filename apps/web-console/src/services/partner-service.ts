import { IPartner, IPartnersResponse } from "@/types/partners";
import { PartnerFormValues } from "@/lib/validations/partner";

export async function getPartners(page: number = 1, limit: number = 10): Promise<IPartnersResponse> {
  const response = await fetch(`/api/partners?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch partners');
  }
  const data = await response.json();
  return data;
}

export async function getPartnerById(id: string): Promise<IPartner> {
  const response = await fetch(`/api/partners/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch partner');
  }
  return response.json();
}

export async function createPartner(data: PartnerFormValues) {
  const response = await fetch("/api/partners", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to create partner")
  }

  return response.json()
}

export async function updatePartner(id: string, data: PartnerFormValues) {
  const response = await fetch(`/api/partners/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update partner")
  }

  return response.json()
} 

export async function deletePartner(id: string) {
  const response = await fetch(`/api/partners/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to delete partner")
  }

  return response.json()
}

