"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ShoppingBag, Lock, Truck } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCart()
  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE20") {
      setDiscount(0.2)
    } else {
      setDiscount(0)
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = subtotal * discount
  const tax = (subtotal - discountAmount) * 0.1
  const total = subtotal - discountAmount + tax

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="border border-border p-6 flex gap-6 bg-card">
                    <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-4">${item.price.toFixed(2)}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-semibold text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="border border-border p-6 sticky top-24 space-y-6 bg-card">
                  <h2 className="text-2xl font-bold text-foreground">Order Summary</h2>

                  {/* Coupon */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Coupon Code</label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="bg-input border-border text-foreground"
                      />
                      <Button onClick={applyCoupon} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Apply
                      </Button>
                    </div>
                    {discount > 0 && (
                      <p className="text-xs text-accent">Coupon applied: {(discount * 100).toFixed(0)}% off</p>
                    )}
                  </div>

                  {/* Breakdown */}
                  <div className="border-t border-border pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-semibold">${subtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="text-accent font-semibold">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="text-foreground font-semibold">${tax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between border-t border-border pt-3">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 flex items-center justify-center gap-2">
                      <Lock className="w-4 h-4" />
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {/* Trust Badges */}
                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      Secure payment
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Truck className="w-4 h-4" />
                      Instant delivery
                    </div>
                  </div>

                  {/* Continue Shopping */}
                  <Link href="/shop">
                    <Button
                      variant="outline"
                      className="w-full border-border hover:bg-secondary text-foreground bg-transparent"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="border border-border p-12 text-center bg-card">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
              <Link href="/shop">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Continue Shopping</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
