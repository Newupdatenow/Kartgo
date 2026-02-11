"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Package, Search, Download, Copy, Eye, Mail, ChevronRight, Calendar, DollarSign } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const SAMPLE_ORDERS = [
  {
    id: "KG-20250103-001",
    date: "Jan 03, 2025",
    items: [
      { name: "Netflix Prepaid Card", quantity: 1, price: 29.99 },
      { name: "Amazon Gift Card", quantity: 2, price: 49.99 },
    ],
    total: 129.97,
    status: "delivered",
    cardCode: "NF-XXXX-XXXX-4892",
    deliveredDate: "Jan 03, 2025",
  },
  {
    id: "KG-20241220-042",
    date: "Dec 20, 2024",
    items: [{ name: "PlayStation Network Card", quantity: 1, price: 44.99 }],
    total: 44.99,
    status: "delivered",
    cardCode: "PS-XXXX-XXXX-7821",
    deliveredDate: "Dec 20, 2024",
  },
  {
    id: "KG-20241215-038",
    date: "Dec 15, 2024",
    items: [{ name: "Spotify Premium Card", quantity: 1, price: 12.99 }],
    total: 12.99,
    status: "processing",
    cardCode: "SP-XXXX-XXXX-5103",
    deliveredDate: null,
  },
]

type OrderStatus = "processing" | "delivered" | "failed"

const getStatusBadge = (status: OrderStatus) => {
  const variants: Record<OrderStatus, { bg: string; text: string; label: string }> = {
    processing: { bg: "bg-blue-500/20", text: "text-blue-400", label: "Processing" },
    delivered: { bg: "bg-primary/20", text: "text-primary", label: "Delivered" },
    failed: { bg: "bg-destructive/20", text: "text-destructive", label: "Failed" },
  }
  const variant = variants[status]
  return <Badge className={`${variant.bg} ${variant.text} border-0`}>{variant.label}</Badge>
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const filteredOrders = SAMPLE_ORDERS.filter((order) => order.id.toLowerCase().includes(searchQuery.toLowerCase()))

  const expandedOrder = SAMPLE_ORDERS.find((o) => o.id === selectedOrder)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Order History</h1>
            <p className="text-muted-foreground">Track and manage all your digital card purchases</p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder="Search by order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border text-foreground"
              />
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id}>
                <Card
                  className="border border-border p-6 cursor-pointer hover:shadow-md transition-shadow bg-card"
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-secondary rounded-lg">
                        <Package className="w-6 h-6 text-primary" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-foreground">{order.id}</h3>
                          {getStatusBadge(order.status as OrderStatus)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Order Date</p>
                            <div className="flex items-center gap-1 text-sm text-foreground">
                              <Calendar className="w-4 h-4" />
                              {order.date}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Items</p>
                            <p className="text-sm font-semibold text-foreground">
                              {order.items.reduce((sum, item) => sum + item.quantity, 0)} item
                              {order.items.reduce((sum, item) => sum + item.quantity, 0) !== 1 ? "s" : ""}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Total</p>
                            <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                              <DollarSign className="w-4 h-4" />
                              {order.total.toFixed(2)}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Status</p>
                            <p className="text-sm font-semibold text-primary capitalize">
                              {order.status === "delivered" ? "Ready to Use" : "In Progress"}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          {order.items.map((item) => item.name).join(", ")}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${selectedOrder === order.id ? "rotate-90" : ""}`}
                    />
                  </div>
                </Card>

                {/* Expanded Order Details */}
                {selectedOrder === order.id && expandedOrder && (
                  <Card className="border border-border bg-secondary mt-2 p-6 space-y-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Order Items</h4>
                      <div className="space-y-3">
                        {expandedOrder.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center p-3 bg-card rounded-lg border border-border"
                          >
                            <div>
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-foreground">${item.price.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Details */}
                    {expandedOrder.status === "delivered" && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Digital Card Details</h4>
                        <Card className="p-4 bg-card border border-border">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Card Code</p>
                              <p className="font-mono font-bold text-foreground">{expandedOrder.cardCode}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-border hover:bg-secondary text-foreground bg-transparent"
                              onClick={() => navigator.clipboard.writeText(expandedOrder.cardCode)}
                            >
                              <Copy className="w-4 h-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </Card>
                        {expandedOrder.deliveredDate && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Delivered on {expandedOrder.deliveredDate}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        className="border-border hover:bg-card text-foreground flex items-center justify-center gap-2 bg-transparent"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4" />
                        Resend Details
                      </Button>
                      <Button
                        variant="outline"
                        className="border-border hover:bg-card text-foreground flex items-center justify-center gap-2 bg-transparent"
                      >
                        <Download className="w-4 h-4" />
                        Invoice
                      </Button>
                      <Button variant="outline" className="border-border hover:bg-card text-foreground bg-transparent">
                        Help & Support
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            ))}

            {filteredOrders.length === 0 && (
              <Card className="border border-border p-12 text-center bg-card">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No orders found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search" : "You haven't placed any orders yet"}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
