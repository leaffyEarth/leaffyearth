"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export function GoogleSignInButton() {
  return (
    <Button
      className="w-full"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      ...
    </Button>
  )
} 