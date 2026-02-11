"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "NEW COLLECTION",
    subtitle: "PREMIUM CARDS",
    description:
      "Discover our exclusive selection of digital prepaid cards with instant delivery. Secure payments and trusted by thousands of users worldwide.",
    image: "/premium-digital-cards-luxury.jpg",
  },
  {
    title: "INSTANT ACCESS",
    subtitle: "GAMING & ENTERTAINMENT",
    description:
      "Get gaming cards, streaming subscriptions, and entertainment credits instantly. Fast processing and immediate delivery to your email.",
    image: "/gaming-cards-digital.jpg",
  },
  {
    title: "CRYPTO PAYMENTS",
    subtitle: "BITCOIN & ETHEREUM",
    description:
      "Now accepting Bitcoin and Ethereum. Shop with cryptocurrency and get your digital cards instantly with secure blockchain verification.",
    image: "/crypto-blockchain-payments.jpg",
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrent(index)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative w-full h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16">
          <div className="max-w-2xl text-white text-right">
            <p className="text-primary text-sm md:text-base font-semibold mb-2">{slides[current].subtitle}</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">{slides[current].title}</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 text-balance">{slides[current].description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link href="/shop">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold w-full sm:w-auto">
                  START SHOPPING
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg font-semibold w-full sm:w-auto bg-transparent"
              >
                LEARN MORE
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary/20 hover:bg-primary/40 text-white p-3 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary/20 hover:bg-primary/40 text-white p-3 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === current ? "bg-primary" : "bg-primary/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
