import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { createJwtToken } from "@/lib/jwt"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = searchParams.get("page") ?? "1"
    const limit = searchParams.get("limit") ?? "10"

    const token = createJwtToken(session)
    
    const response = await fetch(
      `${API_URL}/locations?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[LOCATIONS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const token = createJwtToken(session)

    const response = await fetch(`${API_URL}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Something went wrong" },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[LOCATIONS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 