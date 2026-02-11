"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Edit2,
  Trash2,
  Plus,
  Settings,
  BarChart3,
  PieChartIcon,
  Mail,
  Loader2,
} from "lucide-react"

// Mock data
const dashboardStats = [
  { label: "Total Revenue", value: "$12,450.50", change: "+12.5%", icon: DollarSign },
  { label: "Total Orders", value: "248", change: "+8.3%", icon: ShoppingCart },
  { label: "Active Users", value: "1,284", change: "+5.2%", icon: Users },
  { label: "Page Views", value: "45.2K", change: "+15.1%", icon: Eye },
]

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 2000 },
  { month: "Apr", revenue: 2780 },
  { month: "May", revenue: 1890 },
  { month: "Jun", revenue: 2390 },
  { month: "Jul", revenue: 3490 },
]

const productCategories = [
  { name: "Credit Cards", value: 45, color: "#d4af37" },
  { name: "Bank Logs", value: 55, color: "#ffd700" },
]

const products = [
  { id: 1, name: "Milestone Card", category: "Credit Cards", price: 15.0, inventory: 450, sales: 1203 },
  { id: 2, name: "Capital One Card", category: "Credit Cards", price: 30.0, inventory: 320, sales: 892 },
  { id: 3, name: "Wells Fargo Logs", category: "Bank Logs", price: 80.0, inventory: 180, sales: 567 },
  { id: 4, name: "Citi Bank Logs", category: "Bank Logs", price: 160.0, inventory: 210, sales: 654 },
  { id: 5, name: "Truist Bank Logs", category: "Bank Logs", price: 320.0, inventory: 680, sales: 2104 },
]

const getStatusColor = (status: string) => {
  if (status === "completed") return "bg-accent/10 text-accent"
  if (status === "processing") return "bg-blue-50 text-blue-700"
  return "bg-destructive/10 text-destructive"
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [recentOrders, setRecentOrders] = useState<any[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoadingOrders(true)
        const response = await fetch("/api/orders/create")
        const data = await response.json()
        console.log("[v0] Fetched orders:", data.orders)

        // Format orders for display
        const formattedOrders = (data.orders || []).map((order: any, idx: number) => ({
          id: order.orderId || `#KG-${idx}`,
          customer:
            `${order.deliveryAddress?.firstName || ""} ${order.deliveryAddress?.lastName || ""}`.trim() || "Unknown",
          amount: order.total || 0,
          status: order.status || "completed",
          date: new Date(order.createdAt || Date.now()).toLocaleDateString(),
          email: order.customerEmail || "N/A",
          paymentMethod: order.paymentMethod || "N/A",
          items: order.items || [],
          deliveryAddress: order.deliveryAddress || {},
        }))

        setOrders(formattedOrders)
        // Show last 5 orders on overview
        setRecentOrders(formattedOrders.slice(-5).reverse())
      } catch (error) {
        console.error("[v0] Error fetching orders:", error)
      } finally {
        setIsLoadingOrders(false)
      }
    }

    fetchOrders()
    // Poll for new orders every 10 seconds
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="border-border hover:bg-secondary text-foreground bg-transparent"
              onClick={() => (window.location.href = "/admin/settings")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Settings
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-border hover:bg-secondary text-foreground bg-transparent"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {[
            { id: "overview", label: "Overview" },
            { id: "products", label: "Products" },
            { id: "orders", label: "Orders" },
            { id: "analytics", label: "Analytics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <Card key={idx} className="p-6 border border-border">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge className="bg-accent/10 text-accent border-0">{stat.change}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </Card>
                )
              })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <Card className="lg:col-span-2 p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: `1px solid var(--border)`,
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      dot={{ fill: "var(--primary)", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Category Distribution */}
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">Category Mix</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card className="p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Recent Orders</h3>
              {isLoadingOrders ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              ) : recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No orders yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Order ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-secondary transition-colors">
                          <td className="py-3 px-4 text-foreground font-mono text-sm">{order.id}</td>
                          <td className="py-3 px-4 text-foreground">{order.customer}</td>
                          <td className="py-3 px-4 text-foreground font-semibold">${order.amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <Badge className={`${getStatusColor(order.status)} border-0 capitalize`}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Manage Products</h2>
              <Button className="bg-primary hover:opacity-90 text-primary-foreground flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            <Card className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Inventory</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Sales</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-secondary transition-colors">
                        <td className="py-3 px-4 text-foreground font-medium">{product.name}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-primary/10 text-primary border-0">{product.category}</Badge>
                        </td>
                        <td className="py-3 px-4 text-foreground font-semibold">${product.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-foreground">{product.inventory}</td>
                        <td className="py-3 px-4 text-foreground font-semibold">{product.sales}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-border hover:bg-primary/10 text-foreground bg-transparent"
                              onClick={() => setEditingProduct(editingProduct === product.id ? null : product.id)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-destructive/30 hover:bg-destructive/10 text-destructive bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Order Management</h2>

            {isLoadingOrders ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <Card className="p-12 border border-border text-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No orders yet. Orders will appear here when customers complete purchases.
                </p>
              </Card>
            ) : (
              <Card className="border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Order ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Payment</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-secondary transition-colors">
                          <td className="py-3 px-4 text-foreground font-mono text-sm">{order.id}</td>
                          <td className="py-3 px-4 text-foreground">{order.customer}</td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">{order.email}</td>
                          <td className="py-3 px-4 text-foreground font-semibold">${order.amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-accent/10 text-accent border-0 capitalize">
                              {order.paymentMethod}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground text-sm">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Analytics & Insights</h2>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card className="lg:col-span-2 p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Revenue by Month
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis stroke="var(--muted-foreground)" />
                    <YAxis stroke="var(--muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: `1px solid var(--border)`,
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="revenue" fill="var(--primary)" radius={8} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* Category Distribution */}
              <Card className="p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Product Category Sales
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Key Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Conversion Rate", value: "3.2%", trend: "↑ 0.8%" },
                  { label: "Avg Order Value", value: "$87.50", trend: "↑ $5.20" },
                  { label: "Customer Lifetime Value", value: "$324.80", trend: "↑ $12.30" },
                  { label: "Repeat Purchase Rate", value: "28.4%", trend: "↑ 2.1%" },
                ].map((metric, idx) => (
                  <div key={idx} className="p-4 bg-secondary rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-2">{metric.label}</p>
                    <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                    <p className="text-xs text-accent">{metric.trend}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
