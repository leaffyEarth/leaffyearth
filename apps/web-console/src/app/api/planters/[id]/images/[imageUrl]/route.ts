import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createJwtToken } from "@/lib/jwt"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; imageUrl: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      })
    }

    // Create JWT token for NestJS authentication
    const token = createJwtToken(session)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/planters/${params.id}/images/${params.imageUrl}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify({ message: data.message || "Failed to delete image" }), {
        status: response.status,
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error("Error deleting planter image:", error)
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
} 