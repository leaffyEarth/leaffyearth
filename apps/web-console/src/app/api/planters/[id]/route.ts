import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createJwtToken } from "@/lib/jwt"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      })
    }

    const token = createJwtToken(session)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/planters/${params.id}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify({ message: data.message || "Failed to fetch planter" }), {
        status: response.status,
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error("Error fetching planter:", error)
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      })
    }

    const token = createJwtToken(session)
    const body = await request.json()

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/planters/${params.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify({ message: data.message || "Failed to update planter" }), {
        status: response.status,
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    })
  } catch (error) {
    console.error("Error updating planter:", error)
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      })
    }

    const token = createJwtToken(session)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/planters/${params.id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      const error = await response.json()
      return new Response(JSON.stringify({ message: error.message || "Failed to delete planter" }), {
        status: response.status,
      })
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting planter:", error)
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
} 