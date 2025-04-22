import { getSession } from "next-auth/react"
import { createJwtToken } from "@/lib/jwt"

export async function getAuthToken() {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error("No session found")
    }

    const token = createJwtToken(session)
    console.log("Generated JWT token:", token)
    return token
  } catch (error) {
    console.error("Error getting auth token:", error)
    throw error
  }
} 