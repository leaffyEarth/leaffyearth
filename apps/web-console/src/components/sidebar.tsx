"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  Menu,
  X,
  ChevronDown,
  Leaf,
  Flower2,
  LogOut,
  User,
  MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Logo } from "@/components/logo"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    icon: Package,
    items: [
      {
        title: "Plants",
        href: "/products/plants",
        icon: Leaf,
      },
      {
        title: "Planters",
        href: "/products/planters",
        icon: Flower2,
      },
    ],
  },
  {
    title: "Partners",
    href: "/partners",
    icon: Users,
  },
  {
    title: "Locations",
    href: "/locations",
    icon: MapPin,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(true)
  const { data: session } = useSession()

  // Check if any product sub-item is active
  const isProductsActive = pathname.startsWith('/products/')

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-40 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 -translate-x-full border-r bg-card transition-transform duration-300 md:translate-x-0",
          isMobileOpen && "translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-4">
            <Logo />
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {sidebarItems.map((item) => (
              <div key={item.title}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        isProductsActive && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isProductsOpen && "rotate-180"
                        )}
                      />
                    </Button>
                    {isProductsOpen && (
                      <div className="mt-1 space-y-1 pl-3">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                              pathname === subItem.href
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground"
                            )}
                            onClick={() => setIsMobileOpen(false)}
                          >
                            <subItem.icon className="h-4 w-4" />
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
          
          {/* User Session Section */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between gap-3 rounded-lg px-3 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{session?.user?.name}</span>
                  <span className="text-xs text-muted-foreground">{session?.user?.email}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
} 