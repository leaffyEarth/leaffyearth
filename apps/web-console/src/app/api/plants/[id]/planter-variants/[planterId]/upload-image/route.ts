import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createJwtToken } from "@/lib/jwt"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; planterId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      })
    }

    const token = createJwtToken(session)
    const formData = await request.formData()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/plants/${params.id}/planter-variants/${params.planterId}/upload-image`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify({ message: data.message || "Failed to upload image" }), {
        status: response.status,
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error("Error uploading planter variant image:", error)
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
} 