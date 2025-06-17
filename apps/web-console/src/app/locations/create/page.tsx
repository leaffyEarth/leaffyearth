"use client"

import { CreateLocationForm } from "@/components/forms/create-location-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function NewLocationPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/locations">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Locations
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Add New Location</h1>
        <p className="text-muted-foreground">
          Create a new location in the system
        </p>
      </div>
      <div className="rounded-lg border bg-card p-8">
        <CreateLocationForm />
      </div>
    </div>
  )
} 