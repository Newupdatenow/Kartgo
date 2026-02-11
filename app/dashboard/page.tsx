"use client"

import { ArrowRight, TrendingUp, ShoppingBag, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import HeaderAuthenticated from "@/components/header-authenticated"
import Footer from "@/components/footer"

export default function DashboardPage() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    totalOrders: 12,
    totalSpent: "$847.50",
    memberSince: "June 15, 2024",
  }

  // Mock recent orders
  const recentOrders = [
    {
      id: "KG-001",
      date: "2024-11-20",
      items: "Netflix Gift Card x2, Spotify Card x1",
      amount: "$45.99",
      status: "Delivered",
      statusColor: "text-accent",
    },
    {
      id: "KG-002",
      date: "2024-11-18",
      items: "Amazon Gift Card x1",
      amount: "$50.00",
      status: "Delivered",
      statusColor: "text-accent",
    },
    {
      id: "KG-003",
      date: "2024-11-15",
      items: "PlayStation Store Card x1",
      amount: "$39.99",
      status: "Processing",
      statusColor: "text-primary",
    },
  ]

  const activities = [
    { id: 1, type: "purchase", description: "Purchased Netflix Card", time: "2 hours ago", icon: ShoppingBag },
    { id: 2, type: "delivery", description: "Order KG-001 delivered", time: "1 day ago", icon: CheckCircle },
    { id: 3, type: "purchase", description: "Purchased Amazon Card", time: "3 days ago", icon: ShoppingBag },
    { id: 4, type: "signup", description: "Account created", time: "1 month ago", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderAuthenticated />

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground">Here's your account overview and recent activity</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">{user.totalOrders}</p>
              <p className="text-xs text-accent mt-2">All your purchases</p>
            </Card>

            <Card className="p-6 border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">{user.totalSpent}</p>
              <p className="text-xs text-accent mt-2">Lifetime value</p>
            </Card>

            <Card className="p-6 border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Member Since</p>
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">1M</p>
              <p className="text-xs text-muted-foreground mt-2">{user.memberSince}</p>
            </Card>

            <Card className="p-6 border border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Account Status</p>
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold text-accent">Active</p>
              <p className="text-xs text-accent mt-2">Verified</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <Card className="border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Recent Orders</h2>
                  <Link href="/orders">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border hover:bg-secondary text-primary bg-transparent"
                    >
                      View All <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground mb-1">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.items}</p>
                        <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary mb-1">{order.amount}</p>
                        <p className={`text-sm font-semibold ${order.statusColor}`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions & Activity */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/shop">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                      Buy Cards
                    </Button>
                  </Link>
                  <Link href="/account">
                    <Button
                      variant="outline"
                      className="w-full border-border hover:bg-secondary text-foreground bg-transparent"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="border border-border bg-card p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {activities.map((activity) => {
                    const IconComponent = activity.icon
                    return (
                      <div key={activity.id} className="flex gap-3 items-start">
                        <IconComponent className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
