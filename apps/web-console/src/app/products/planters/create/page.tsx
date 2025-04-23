import { CreatePlanterForm } from "@/components/forms/create-planter-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CreatePlanterPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products/planters">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Planters
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Create New Planter</h1>
        <p className="text-muted-foreground">
          Add a new planter to your collection
        </p>
      </div>
      <div className="rounded-lg border bg-card p-8">
        <CreatePlanterForm />
      </div>
    </div>
  )
} 