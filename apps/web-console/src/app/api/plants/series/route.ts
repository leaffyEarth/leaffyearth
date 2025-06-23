import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { createJwtToken } from "@/lib/jwt"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      })
    }

    const token = createJwtToken(session)

    const response = await fetch(`${API_URL}/plants/series`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch plant series")
    }

    const data = await response.json()
    // Transform the data to include both id and count
    const transformedData = data.map((item: { _id: string; totalCount: number }) => ({
      id: item._id,
      name: item._id,
      count: item.totalCount
    }))
    return NextResponse.json(transformedData)
  } catch (error) {
    console.error("Error fetching plant series:", error)
    return NextResponse.json(
      { error: "Failed to fetch plant series" },
      { status: 500 }
    )
  }
}