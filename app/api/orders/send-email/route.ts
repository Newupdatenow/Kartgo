import { type NextRequest, NextResponse } from "next/server"

// Simulated email service integration
async function sendCardDetailsEmail(
  email: string,
  cardDetails: {
    cardName: string
    cardCode: string
    instructions: string
    expiryDate: string
  },
) {
  // In production, integrate with Resend, SendGrid, or Nodemailer
  console.log("[Email Service] Sending card details to:", email)
  console.log("[Email Service] Card Code:", cardDetails.cardCode)

  // Simulated API call
  return {
    success: true,
    messageId: `msg_${Date.now()}`,
    email: email,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, orderId, cardDetails } = body

    if (!email || !orderId || !cardDetails) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send the email
    const result = await sendCardDetailsEmail(email, cardDetails)

    return NextResponse.json({
      success: true,
      data: result,
      message: "Card details sent successfully",
    })
  } catch (error) {
    console.error("[Email Service Error]", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
