import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 md:pl-64">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
} 