import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/context/cart-context"
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KartaGo - Premium Digital Cards",
  description: "Buy instant digital prepaid cards and gift cards. Fast delivery, secure payments, and crypto support.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <CartProvider>
          {children}
          <SonnerToaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
