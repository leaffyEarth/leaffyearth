import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium">Total Sales</h3>
          <p className="mt-2 text-3xl font-bold">$12,345</p>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium">Total Orders</h3>
          <p className="mt-2 text-3xl font-bold">123</p>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium">Total Customers</h3>
          <p className="mt-2 text-3xl font-bold">456</p>
          <p className="text-xs text-muted-foreground">+8% from last month</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-sm font-medium">Total Products</h3>
          <p className="mt-2 text-3xl font-bold">789</p>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-medium">Recent Orders</h3>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">No recent orders</p>
        </div>
      </div>
    </div>
  )
} 