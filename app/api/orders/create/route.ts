import { type NextRequest, NextResponse } from "next/server"

// This stores orders in memory. For production, use a database
const orders: any[] = []

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Add order to storage with timestamp
    const order = {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: "completed",
    }

    orders.push(order)

    // Log the order for verification
    console.log("[v0] Order created:", order)

    return NextResponse.json({ success: true, order }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({ orders }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
