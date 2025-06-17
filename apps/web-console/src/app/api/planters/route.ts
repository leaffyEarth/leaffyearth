import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { createJwtToken } from "@/lib/jwt"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      })
    }

    const token = createJwtToken(session)

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "10"
    const fields = searchParams.get("fields")
    const search = searchParams.get("search")
    const planterCategory = searchParams.get("planterCategory")
    const planterSeries = searchParams.get("planterSeries")
    const size = searchParams.get("size")

    // Build query string
    const queryParams = new URLSearchParams()
    queryParams.append("page", page)
    queryParams.append("limit", limit)
    if (fields) queryParams.append("fields", fields)
    if (search) queryParams.append("search", search)
    if (planterCategory) queryParams.append("planterCategory", planterCategory)
    if (planterSeries) queryParams.append("planterSeries", planterSeries)
    if (size) queryParams.append("size", size)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/planters?${queryParams.toString()}`,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify({ message: data.message || "Failed to fetch planters" }), {
        status: response.status,
      })
    }

    // Transform the data to ensure consistent structure
    const transformedData = {
      data: data?.data,
      page: data.page || 1,
      limit: data.limit || 10,
      total: data.total || 0
    }

    return new Response(JSON.stringify(transformedData), {
      status: 200,
    })
  } catch (error) {
    console.error("Error fetching planters:", error)
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      })
    }

    const token = createJwtToken(session)
    const body = await request.json()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/planters`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return new Response(JSON.stringify({ message: data.message || "Failed to create planter" }), {
        status: response.status,
      })
    }

    return new Response(JSON.stringify(data), {
      status: 201,
    })
  } catch (error) {
    console.error("Error creating planter:", error)
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    )
  }
} 