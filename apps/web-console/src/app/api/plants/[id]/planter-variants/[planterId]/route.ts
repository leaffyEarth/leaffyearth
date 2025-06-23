import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createJwtToken } from "@/lib/jwt"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; planterId: string } }
) {
  try {
    console.log("DELETE request received for planter variant", params.planterId)
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      })
    }

    const token = createJwtToken(session)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/plants/${params.id}/planter-variants/${params.planterId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    )

    console.log("DELETE response", response)

    const data = await response.json()


    if (!response.ok) {
      return new Response(JSON.stringify({ message: data.message || "Failed to delete planter variant" }), {
        status: response.status,
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error("Error deleting planter variant:", error)
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
} 