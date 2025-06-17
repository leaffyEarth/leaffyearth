"use client"

import { EditPartnerForm } from "@/components/forms/edit-partner-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getPartnerById } from "@/services/partner-service"
import { IPartner } from "@/types/partners"
import { Loader } from "@/components/ui/loader"

export default function EditPartnerPage() {
  const params = useParams()
  const [partner, setPartner] = useState<IPartner | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPartner() {
      try {
        const data = await getPartnerById(params.id as string)
        setPartner(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load partner")
      } finally {
        setIsLoading(false)
      }
    }

    loadPartner()
  }, [params.id])

  if (isLoading) {
    return <Loader text="Loading partner details..." />
  }

  if (error || !partner) {
    return <div>{error || "Partner not found"}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/partners">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Partners
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Edit Partner</h1>
        <p className="text-muted-foreground">
          Update partner information
        </p>
      </div>
      <div className="rounded-lg border bg-card p-8">
        <EditPartnerForm partner={partner} />
      </div>
    </div>
  )
}