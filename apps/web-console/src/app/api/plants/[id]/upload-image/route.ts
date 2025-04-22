import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { createJwtToken } from "@/lib/jwt"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const formData = await request.formData()
    const token = createJwtToken(session)

    const response = await fetch(`${API_URL}/plants/${params.id}/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
    console.error("[PLANT_IMAGE_UPLOAD]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 