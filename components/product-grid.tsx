"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState } from "react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  rating: number
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Milestone Credit Card",
    price: 100,
    image: "https://rates.fm/static/content/thumbs/560x/7/70/zmlzya-946ad1a71e3fa86606568fc755077707.webp",
    description: "Milestone Credit Card - $60 Balance",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Capital One Credit Card",
    price: 75,
    image: "https://ecm.capitalone.com/WCM/card/products/plat_cardart_prim_323x203/mobile.png",
    description: "Capital One Credit Card - $60 Balance",
    rating: 4.7,
  },
  {
    id: "3",
    name: "Discovery Bank Credit Card",
    price: 75,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEekOSAerEaNBuxM0hIMbN0bUYFY7Ta0En_w&s",
    description: "Discovery Bank Credit Card - $60 Balance",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Citi Bank Credit Card",
    price: 75,
    image: "https://www.shutterstock.com/image-photo/ranchiind…june-29-2023closeup-citibank-600nw-2408305117.jpg",
    description: "Citi Bank Credit Card - $60 Balance",
    rating: 4.8,
  },
  {
    id: "5",
    name: "Wells Fargo Bank Logs",
    price: 400,
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80",
    description: "Wells Fargo Bank Logs - $5k-$15k Balance",
    rating: 4.9,
  },
  {
    id: "6",
    name: "Truist Bank Logs",
    price: 800,
    image: "https://mma.prnewswire.com/media/1075419/TruistPurpleLogo.jpg?w=2700",
    description: "Truist Bank Logs - $10k-$20k Balance",
    rating: 4.7,
  },
]

export default function ProductGrid() {
  const { addToCart } = useCart()
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    })
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 2000)
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance text-center">Popular Cards</h2>
        <p className="text-muted-foreground mb-12 text-balance text-center">
          Instantly purchase and receive your digital prepaid cards via email
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_PRODUCTS.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card border-border"
            >
              <div className="aspect-square bg-secondary overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 flex flex-col p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>

                <div className="flex items-center gap-1 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-1">{product.rating}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 flex-grow">{product.description}</p>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    {addedId === product.id ? "Added!" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
