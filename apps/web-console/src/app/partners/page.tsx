"use client"

import { usePartners } from "@/hooks/use-partners"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function PartnersPage() {
  const { partners, isLoading, error } = usePartners()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search partners..."
              className="pl-8"
            />
          </div>
        </div>
        <Button onClick={() => router.push("/partners/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Partner
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner._id} className="overflow-hidden cursor-pointer" onClick={() => router.push(`/partners/${partner._id}`)}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{partner.name}</CardTitle>
                <Badge variant={partner.isActive ? "default" : "secondary"}>
                  {partner.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>{partner.address}</p>
                {/* {partner.contactPerson && (
                  <p>Contact: {partner.contactPerson}</p>
                )}
                {partner.contactPhone && (
                  <p>Phone: {partner.contactPhone}</p>
                )} */}
                {partner.email && (
                  <p>Email: {partner.email}</p>
                )}
                {partner.location && (
                  <p>Location: {partner.location.name}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 