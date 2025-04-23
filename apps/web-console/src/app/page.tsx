import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to LeaffyEarth Admin Portal
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Your ecommerce platform administration dashboard
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
