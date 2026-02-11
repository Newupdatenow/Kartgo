import { type NextRequest, NextResponse } from "next/server"

// Simulated order database
const orders = [
  {
    id: "CV-20250103-001",
    userId: "user-1",
    items: [
      { productId: "1", name: "Netflix Card", quantity: 1, price: 29.99 },
      { productId: "2", name: "Amazon Card", quantity: 2, price: 49.99 },
    ],
    total: 129.97,
    status: "delivered",
    createdAt: "2025-01-03T10:00:00Z",
    deliveredAt: "2025-01-03T12:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    const userOrders = orders.filter((order) => order.userId === userId)

    return NextResponse.json({
      success: true,
      data: userOrders,
    })
  } catch (error) {
    console.error("[Orders API Error]", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, items, total } = body

    if (!userId || !items || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new order
    const newOrder = {
      id: `CV-${new Date().toISOString().split("T")[0].replace(/-/g, "")}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      userId,
      items,
      total,
      status: "processing",
      createdAt: new Date().toISOString(),
      deliveredAt: null,
    }

    orders.push(newOrder)

    return NextResponse.json({
      success: true,
      data: newOrder,
      message: "Order created successfully",
    })
  } catch (error) {
    console.error("[Orders API Error]", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
