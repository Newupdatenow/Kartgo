import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, orderDetails, paymentMethod, adminEmail: customAdminEmail } = await request.json()

    const adminEmail = customAdminEmail || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "emmanuel@mailinator.com"

    console.log("[v0] Payment notification triggered:")
    console.log("[v0] Customer email:", email)
    console.log("[v0] Admin email:", adminEmail)
    console.log("[v0] Order ID:", orderDetails.orderId)
    console.log("[v0] Amount:", orderDetails.total)
    console.log("[v0] Payment method:", paymentMethod)

    // Create order record
    try {
      const orderResponse = await fetch(`http://localhost:3000/api/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      })
      const orderResult = await orderResponse.json()
      console.log("[v0] Order created successfully:", orderResult)
    } catch (err) {
      console.error("[v0] Error creating order record:", err)
    }

    // Email content for customer
    const customerEmail = {
      to: email,
      subject: `Payment Confirmation - Order ${orderDetails.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Payment Received</h2>
          <p>Thank you for your purchase!</p>
          <h3>Order Details:</h3>
          <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
          <p><strong>Amount:</strong> $${orderDetails.total.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
          <h3>Items:</h3>
          <ul>
            ${orderDetails.items.map((item: any) => `<li>${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}</li>`).join("")}
          </ul>
          <h3>Delivery Address:</h3>
          <p>${orderDetails.deliveryAddress.firstName} ${orderDetails.deliveryAddress.lastName}</p>
          <p>${orderDetails.deliveryAddress.city}, ${orderDetails.deliveryAddress.state} ${orderDetails.deliveryAddress.zipCode}</p>
          <p>${orderDetails.deliveryAddress.country}</p>
          <p style="color: #d4af37; font-weight: bold;">Your digital cards will be sent shortly!</p>
        </div>
      `,
    }

    // Email content for admin
    const adminNotification = {
      to: adminEmail,
      subject: `New Payment Received - Order ${orderDetails.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">New Order Payment</h2>
          <p><strong>Customer Email:</strong> ${email}</p>
          <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
          <p><strong>Amount:</strong> $${orderDetails.total.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
          <h3>Items Purchased:</h3>
          <ul>
            ${orderDetails.items.map((item: any) => `<li>${item.name} (${item.quantity}x)</li>`).join("")}
          </ul>
          <h3>Delivery Address:</h3>
          <p>${orderDetails.deliveryAddress.firstName} ${orderDetails.deliveryAddress.lastName}</p>
          <p>${orderDetails.deliveryAddress.city}, ${orderDetails.deliveryAddress.state} ${orderDetails.deliveryAddress.zipCode}</p>
          <p>${orderDetails.deliveryAddress.country}</p>
          <p style="color: #ffd700; font-weight: bold;">Please process this order and send the digital cards to the customer.</p>
        </div>
      `,
    }

    // Send customer email
    try {
      const customerEmailResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/orders/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: customerEmail.to, subject: customerEmail.subject, html: customerEmail.html }),
      });
      console.log("[v0] Customer email sent:", await customerEmailResponse.json());
    } catch (err) {
      console.error("[v0] Error sending customer email:", err);
    }

    // Send admin notification
    try {
      const adminEmailResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/orders/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminNotification.to, subject: adminNotification.subject, html: adminNotification.html }),
      });
      console.log("[v0] Admin email sent:", await adminEmailResponse.json());
    } catch (err) {
      console.error("[v0] Error sending admin email:", err);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Payment notification processed",
        orderId: orderDetails.orderId,
        sentTo: { customer: email, admin: adminEmail,adminNotification },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Payment notification error:", error)
    return NextResponse.json({ error: "Failed to process notification" }, { status: 500 })
  }
}
