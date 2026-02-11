"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckCircle2, ArrowLeft, Lock, Truck, Shield, Bitcoin, Copy, Check } from "lucide-react"
import Header from "@/components/header"
import { Label } from "@/components/ui/label"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import emailjs from "@emailjs/browser"


interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  country: string
  phone?: string
  cardName?: string
  cardNumber?: string
  expiry?: string
  cvv?: string
  street?: string
  zipCode?: string
}

interface OrderDetails {
  orderId: string
  total: number
  paymentMethod: string
  items: { name: string; quantity: number }[]
  deliveryAddress: CheckoutFormData
  customerEmail: string
}

export default function CheckoutPage() {
  const { items, total: cartTotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState("shipping")
  const [paymentMethod, setPaymentMethod] = useState("bitcoin")
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   street: "",
  //   city: "",
  //   state: "",
  //   zipCode: "",
  //   country: "",
  //   cardName: "",
  //   cardNumber: "",
  //   expiry: "",
  //   cvv: "",
  // })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId, setOrderId] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // const sendPaymentNotification = async (email: string, orderDetails: any) => {
  //   try {
  //     const adminEmailFromStorage = localStorage.getItem("kartago-admin-email") || "emmanuel@gmailinator.com"

  //     console.log("[v0] Sending payment notification...")
  //     console.log("[v0] Admin email:", adminEmailFromStorage)

  //     const response = await fetch("/api/payment-notification", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email,
  //         orderDetails,
  //         paymentMethod,
  //         adminEmail: adminEmailFromStorage,
  //       }),
  //     })

  //     const result = await response.json()
  //     console.log("[v0] Notification response:", result)

  //     if (!response.ok) {
  //       console.error("[v0] Failed to send notification:", result)
  //     }
  //   } catch (error) {
  //     console.error("[v0] Error sending notification:", error)
  //   }
  // }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsProcessing(true)

  //   const newOrderId = `#KG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  //   setOrderId(newOrderId)

  //   const orderDetails = {
  //     orderId: newOrderId,
  //     items,
  //     total: cartTotal,
  //     paymentMethod,
  //     customerEmail: formData.email,
  //     deliveryAddress: {
  //       firstName: formData.firstName,
  //       lastName: formData.lastName,
  //       street: formData.street,
  //       city: formData.city,
  //       state: formData.state,
  //       zipCode: formData.zipCode,
  //       country: formData.country,
  //     },
  //   }

  //   // Send notifications to both customer and admin
  //   sendPaymentNotification(formData.email, orderDetails)

  //   // Simulate payment processing
  //   setTimeout(() => {
  //     setIsProcessing(false)
  //     setCurrentStep("confirmation")
  //     clearCart()
  //   }, 2000)
  // }

  const copyToClipboard = (text: string, addressType: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(addressType)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const router = useRouter()

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    street: "",
    zipCode: "",
  })

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderId: "",
    total: 0,
    paymentMethod: "Wallet",
    items: [],
    deliveryAddress: formData,
    customerEmail: "",
  })

  useEffect(() => {
    // Example simulated data
    setOrderDetails({
      orderId: "ORD-" + Date.now(),
      total: 55000,
      paymentMethod: "Wallet",
      items: [
        { name: "Custom T-shirt", quantity: 2 },
        { name: "Inkloom Cap", quantity: 1 },
      ],
      deliveryAddress: formData,
      customerEmail: formData.email,
    })
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const sendPaymentNotification = async (email: string, orderDetails: any) => {
    try {
      const adminEmailFromStorage = localStorage.getItem("kartago-admin-email") || "emmanuel@gmailinator.com"

      console.log("[EmailJS] Sending payment notification...")

      const templateParams = {
        to_email: adminEmailFromStorage,
        from_email: email,
        customer_name: `${orderDetails.deliveryAddress.firstName} ${orderDetails.deliveryAddress.lastName}`,
        customer_email: orderDetails.customerEmail,
        order_id: orderDetails.orderId,
        total: `₦${orderDetails.total.toLocaleString()}`,
        payment_method: orderDetails.paymentMethod,
        address: `${orderDetails.deliveryAddress.address}, ${orderDetails.deliveryAddress.city}, ${orderDetails.deliveryAddress.state}, ${orderDetails.deliveryAddress.country}`,
        items: orderDetails.items.map((item: any) => `${item.name} (x${item.quantity})`).join(", "),
      }

      const response = await emailjs.send(
        "service_j8fgyss", // Your service ID
        "template_n9t1mpy", // Your template ID
        templateParams,
        "sAuhH3NPRjq6_Ci2v" // Your public key
      )

      console.log("[EmailJS] Notification sent:", response.status, response.text)
      toast.success("Payment notification sent successfully!")
    } catch (error) {
      console.error("[EmailJS] Failed to send email:", error)
      toast.error("Failed to send payment notification.")
    }
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   toast.loading("Processing your order...")
  //   setTimeout(() => {
  //     toast.dismiss()
  //     toast.success("Order placed successfully!")
  //     sendPaymentNotification(formData.email, orderDetails)
  //     router.push("/success")
  //   }, 2000)
  // }


  const subtotal = cartTotal
  const tax = subtotal * 0.1
  const orderTotal = subtotal + tax

  const bitcoinAddress = "bc1q9dwzjylfz0l8jdsdf8k6qn5tls9lp4dc4e89me"
  const ethereumAddress = "0x5c3ae60423b78d7d07C66C1924cAd6Ec0552Dc6e"
  const solanaAddress = "9yNAmygJyQQuhttxBNtj1i15M9rZoHHE3EFbxek7ZNto"

  const bitcoinAmount = (orderTotal / 65000).toFixed(6)
  const ethereumAmount = (orderTotal / 2400).toFixed(4)
  const solanaAmount = (orderTotal / 140).toFixed(2)
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   try {
  //     toast.loading("Processing your order...")

  //     // Prepare the email parameters for EmailJS
  //     const templateParams = {
  //       email: formData.email,
  //       to_name: "Inkloom Admin", // or your preferred team label
  //       from_name: `${formData.firstName} ${formData.lastName}`,
  //       message: `
  //       🧾 New Order Received!
        
  //       Customer: ${formData.firstName} ${formData.lastName}
  //       Email: ${formData.email}
  //       Address: ${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}
        
  //       Payment Method: ${orderDetails.paymentMethod}
  //       Total: ₦${orderDetails.total.toLocaleString()}
        
  //       Items: ${orderDetails.items.map((item) => `${item.name} (x${item.quantity})`).join(", ")}
  //     `,
  //     }

  //     // Send email via EmailJS
  //     await emailjs.send(
  //       "service_j8fgyss", // your service ID
  //       "template_n9t1mpy", // your template ID
  //       templateParams,
  //       "sAuhH3NPRjq6_Ci2v" // your public key
  //     )

  //     toast.dismiss()
  //     toast.success("Order placed successfully! Notification sent to admin.")

  //     // Reset form fields after success
  //     setFormData({
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       address: "",
  //       city: "",
  //       state: "",
  //       country: "",
  //     })

  //     // Redirect to success page
  //     // setTimeout(() => router.push("/success"), 1000)
  //   } catch (err) {
  //     console.error("[EmailJS Error]:", err)
  //     toast.dismiss()
  //     toast.error("Failed to process your order. Please try again later.")
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  toast.loading("Processing your order...")
  setIsProcessing(true)

  try {
    const templateParams = {
      customer_name: `${formData.firstName} ${formData.lastName}`,
      customer_email: formData.email,
      order_id: orderDetails.orderId,
      payment_method: orderDetails.paymentMethod,
      total: `$${orderTotal.toLocaleString()}`,
      address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}`,
      items: items.map((item) => `${item.name} (x${item.quantity})`).join(", "),
    }

    console.log("📦 Sending EmailJS with:", templateParams)

    await emailjs.send(
      "service_j8fgyss",
      "template_n9t1mpy",
      templateParams,
      "sAuhH3NPRjq6_Ci2v"
    )

    toast.dismiss()
    toast.success("Order placed successfully!")
    setTimeout(() => { setIsProcessing(false), setCurrentStep("confirmation"), clearCart() }, 2000)
  } catch (error) {
    console.error("[EmailJS Error]", error)
    toast.dismiss()
    toast.error("Failed to send order notification.")
  }
}
  if (currentStep === "confirmation") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 py-12">
          <div className="max-w-md mx-auto px-4">
            <Card className="border border-border p-12 text-center space-y-6 bg-card">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful</h1>
                <p className="text-muted-foreground">
                  Your order has been confirmed and you'll receive the card details via email shortly.
                </p>
              </div>

              {/* <div className="bg-secondary p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-semibold text-foreground">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-semibold text-foreground">${orderTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-semibold text-foreground">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-semibold text-foreground capitalize">{paymentMethod}</span>
                </div>
              </div> */}

              <div className="bg-accent/10 border border-accent/30 p-4 rounded-lg">
                <p className="text-sm text-accent font-semibold">
                  Check your email (and spam folder) for your digital card details and instructions in 30mins - 1hour.
                </p>
              </div>

              <div className="space-y-2">
                <Link href="/orders">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    View Your Orders
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    variant="outline"
                    className="w-full border-border hover:bg-secondary text-foreground bg-transparent"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/cart" className="flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="border border-border p-8 bg-card">
                {/* Step Indicator */}
                <div className="flex gap-4 mb-8 overflow-x-auto">
                  {["Shipping", "Payment", "Review"].map((step, idx) => (
                    <div key={step} className="flex items-center gap-2 flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${(currentStep === "shipping" && idx === 0) ||
                          (currentStep === "payment" && idx <= 1) ||
                          (currentStep === "review" && idx <= 2)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                          }`}
                      >
                        {idx + 1}
                      </div>
                      <span className="hidden sm:inline text-sm font-semibold text-foreground">{step}</span>
                      {idx < 2 && <div className="hidden sm:block w-8 h-0.5 bg-border mx-2" />}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Delivery Address Section */}
                  {(currentStep === "shipping" || currentStep === "review") && (
                    <div className={currentStep === "review" ? "opacity-50 pointer-events-none" : ""}>
                      <h2 className="text-2xl font-bold text-foreground mb-6">Delivery Address</h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                          <Input
                            type="text"
                            name="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="bg-input border-border text-foreground"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                          <Input
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="bg-input border-border text-foreground"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-input border-border text-foreground"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                          <Input
                            type="tel"
                            name="phone"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="bg-input border-border text-foreground"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">City</label>
                          <Input
                            type="text"
                            name="city"
                            placeholder="New York"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="bg-input border-border text-foreground"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">State</label>
                          <Input
                            type="text"
                            name="state"
                            placeholder="NY"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="bg-input border-border text-foreground"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">ZIP</label>
                          <Input
                            type="text"
                            name="zipCode"
                            placeholder="10001"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="bg-input border-border text-foreground"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                          <Input
                            type="text"
                            name="country"
                            placeholder="USA"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="bg-input border-border text-foreground"
                            required
                          />
                        </div>
                      </div>
                      {/* <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
              </div>
            </div>
            <div className="pt-4">
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
                Complete Purchase
              </Button>
            </div>
          </form> */}

                      {currentStep === "shipping" && (
                        <Button
                          type="button"
                          onClick={() => setCurrentStep("payment")}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5"
                        >
                          Continue to Payment
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Payment Information */}
                  {(currentStep === "payment" || currentStep === "review") && (
                    <div className={currentStep === "review" ? "opacity-50 pointer-events-none" : ""}>
                      <div className="border-t border-border pt-8 mb-6">
                        <h2 className="text-2xl font-bold text-foreground mb-6">Payment Method</h2>

                        <div className="space-y-3 mb-6">
                          {/* Bitcoin Payment Option */}
                          <label
                            className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                            style={{ borderColor: paymentMethod === "bitcoin" ? "#d4af37" : "undefined" }}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="bitcoin"
                              checked={paymentMethod === "bitcoin"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-4 h-4"
                            />
                            <div>
                              <p className="font-semibold text-foreground flex items-center gap-2">
                                <Bitcoin className="w-4 h-4" /> Bitcoin
                              </p>
                              <p className="text-xs text-muted-foreground">Pay with BTC</p>
                            </div>
                          </label>

                          {/* Ethereum Payment Option */}
                          <label
                            className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                            style={{ borderColor: paymentMethod === "ethereum" ? "#d4af37" : "undefined" }}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="ethereum"
                              checked={paymentMethod === "ethereum"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-4 h-4"
                            />
                            <div>
                              <p className="font-semibold text-foreground">Ethereum</p>
                              <p className="text-xs text-muted-foreground">Pay with ETH</p>
                            </div>
                          </label>

                          <label
                            className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors"
                            style={{ borderColor: paymentMethod === "solana" ? "#d4af37" : "undefined" }}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="solana"
                              checked={paymentMethod === "solana"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-4 h-4"
                            />
                            <div>
                              <p className="font-semibold text-foreground">Solana</p>
                              <p className="text-xs text-muted-foreground">Pay with SOL</p>
                            </div>
                          </label>
                        </div>

                        {/* Bitcoin Payment Details */}
                        {paymentMethod === "bitcoin" && (
                          <div className="space-y-4 mb-6 bg-secondary p-6 rounded-lg border border-border">
                            <p className="text-sm text-muted-foreground mb-4">
                              Send the following amount to complete your purchase:
                            </p>
                            <div className="bg-input p-4 rounded-lg mb-4">
                              <p className="text-xs text-muted-foreground mb-1">Amount to pay:</p>
                              <p className="text-2xl font-bold text-primary">{bitcoinAmount} BTC</p>
                              <p className="text-xs text-muted-foreground">(≈ ${orderTotal.toFixed(2)})</p>
                            </div>
                            <div className="bg-input p-4 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-2">Send to this address:</p>
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-mono text-foreground break-all flex-1">{bitcoinAddress}</p>
                                <button
                                  onClick={() => copyToClipboard(bitcoinAddress, "bitcoin")}
                                  className="flex-shrink-0 p-2 hover:bg-secondary rounded transition-colors"
                                  title="Copy address"
                                >
                                  {copiedAddress === "bitcoin" ? (
                                    <Check className="w-4 h-4 text-accent" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-accent bg-accent/10 p-3 rounded">
                              Your order will be confirmed once the transaction is verified on the blockchain.
                            </p>
                          </div>
                        )}

                        {/* Ethereum Payment Details */}
                        {paymentMethod === "ethereum" && (
                          <div className="space-y-4 mb-6 bg-secondary p-6 rounded-lg border border-border">
                            <p className="text-sm text-muted-foreground mb-4">
                              Send the following amount to complete your purchase:
                            </p>
                            <div className="bg-input p-4 rounded-lg mb-4">
                              <p className="text-xs text-muted-foreground mb-1">Amount to pay:</p>
                              <p className="text-2xl font-bold text-primary">{ethereumAmount} ETH</p>
                              <p className="text-xs text-muted-foreground">(≈ ${orderTotal.toFixed(2)})</p>
                            </div>
                            <div className="bg-input p-4 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-2">Send to this address:</p>
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-mono text-foreground break-all flex-1">{ethereumAddress}</p>
                                <button
                                  onClick={() => copyToClipboard(ethereumAddress, "ethereum")}
                                  className="flex-shrink-0 p-2 hover:bg-secondary rounded transition-colors"
                                  title="Copy address"
                                >
                                  {copiedAddress === "ethereum" ? (
                                    <Check className="w-4 h-4 text-accent" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-accent bg-accent/10 p-3 rounded">
                              Your order will be confirmed once the transaction is verified on the blockchain.
                            </p>
                          </div>
                        )}

                        {paymentMethod === "solana" && (
                          <div className="space-y-4 mb-6 bg-secondary p-6 rounded-lg border border-border">
                            <p className="text-sm text-muted-foreground mb-4">
                              Send the following amount to complete your purchase:
                            </p>
                            <div className="bg-input p-4 rounded-lg mb-4">
                              <p className="text-xs text-muted-foreground mb-1">Amount to pay:</p>
                              <p className="text-2xl font-bold text-primary">{solanaAmount} SOL</p>
                              <p className="text-xs text-muted-foreground">(≈ ${orderTotal.toFixed(2)})</p>
                            </div>
                            <div className="bg-input p-4 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-2">Send to this address:</p>
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-mono text-foreground break-all flex-1">{solanaAddress}</p>
                                <button
                                  onClick={() => copyToClipboard(solanaAddress, "solana")}
                                  className="flex-shrink-0 p-2 hover:bg-secondary rounded transition-colors"
                                  title="Copy address"
                                >
                                  {copiedAddress === "solana" ? (
                                    <Check className="w-4 h-4 text-accent" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-accent bg-accent/10 p-3 rounded">
                              Your order will be confirmed once the transaction is verified on the blockchain.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        {currentStep === "payment" && (
                          <>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setCurrentStep("shipping")}
                              className="flex-1 border-border hover:bg-secondary text-foreground"
                            >
                              Back
                            </Button>
                            <Button
                              type="button"
                              onClick={() => setCurrentStep("review")}
                              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                            >
                              Review Order
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Review Section */}
                  {currentStep === "review" && (
                    <div className="border-t border-border pt-8 space-y-4">
                      <h2 className="text-2xl font-bold text-foreground mb-6">Review Your Order</h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="p-4 bg-secondary border-0">
                          <p className="text-xs text-muted-foreground mb-1">Delivery To</p>
                          <p className="text-sm font-semibold text-foreground">
                            {formData.firstName} {formData.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formData.city}, {formData.state} {formData.zipCode}
                          </p>
                        </Card>

                        <Card className="p-4 bg-secondary border-0">
                          <p className="text-xs text-muted-foreground mb-1">Payment Method</p>
                          <p className="text-sm font-semibold text-foreground capitalize">{paymentMethod}</p>
                          {paymentMethod === "bitcoin" && (
                            <p className="text-xs text-muted-foreground">{bitcoinAmount} BTC</p>
                          )}
                          {paymentMethod === "ethereum" && (
                            <p className="text-xs text-muted-foreground">{ethereumAmount} ETH</p>
                          )}
                          {paymentMethod === "solana" && (
                            <p className="text-xs text-muted-foreground">{solanaAmount} SOL</p>
                          )}
                        </Card>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep("payment")}
                          className="flex-1 border-border hover:bg-secondary text-foreground"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={isProcessing}
                          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2"
                        >
                          <Lock className="w-4 h-4" />
                          {isProcessing ? "Processing..." : "Complete Purchase"}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border border-border p-6 sticky top-24 space-y-6 bg-card">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-3 border-b border-border pb-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-accent font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    256-bit SSL Encryption
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    Fraud Protection
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    Instant Email Delivery
                  </div>
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
