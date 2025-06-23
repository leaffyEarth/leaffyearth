"use client"

import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/user-nav"

// Map of routes to their display titles
const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/products/plants": "Plants",
  "/products/planters": "Planters",
  "/orders": "Orders",
  "/customers": "Customers",
  "/settings": "Settings",
}

export function Header() {
  const pathname = usePathname()
  
  // Get the title for the current route, or use a default
  const getTitle = () => {
    // Check for exact match first
    if (routeTitles[pathname]) {
      return routeTitles[pathname]
    }
    
    // Check for partial matches (for nested routes)
    for (const [route, title] of Object.entries(routeTitles)) {
      if (pathname.startsWith(route) && route !== "/") {
        return title
      }
    }
    
    // Default title
    return "LeaffyEarth"
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-semibold">{getTitle()}</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
} 