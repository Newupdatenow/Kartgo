"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, Star, ChevronDown } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"

const ALL_PRODUCTS = [
  // Credit Cards Section
  {
    id: "1",
    name: "Milestone Credit Card",
    price: 150,
    amount: "$300",
    image: "https://rates.fm/static/content/thumbs/560x/7/70/zmlzya-946ad1a71e3fa86606568fc755077707.webp",
    category: "App & Services",
    rating: 4.8,
    description: "Milestone Credit Card - $600 Balance",
    subcategory: "Credit Cards",
  },
  {
    id: "2",
    name: "Milestone Credit Card",
    price: 200,
    amount: "$599",
    image: "https://rates.fm/static/content/thumbs/560x/7/70/zmlzya-946ad1a71e3fa86606568fc755077707.webp",
    category: "App & Services",
    rating: 4.8,
    description: "Milestone Credit Card - $999 Balance",
    subcategory: "Credit Cards",
  },
  {
    id: "3",
    name: "Milestone Credit Card",
    price: 200,
    amount: "$700",
    image: "https://rates.fm/static/content/thumbs/560x/7/70/zmlzya-946ad1a71e3fa86606568fc755077707.webp",
    category: "App & Services",
    rating: 4.8,
    description: "Milestone Credit Card - $1400 Balance",
    subcategory: "Credit Cards",
  },
  {
    id: "4",
    name: "Capital One Credit Card",
    price: 150,
    amount: "$300",
    image: "https://ecm.capitalone.com/WCM/card/products/plat_cardart_prim_323x203/mobile.png",
    category: "App & Services",
    rating: 4.7,
    description: "Capital One Credit Card - $600 Balance",
    subcategory: "Credit Cards",
  },
  {
    id: "5",
    name: "Capital One Credit Card",
    price: 300,
    amount: "$555",
    image: "https://ecm.capitalone.com/WCM/card/products/plat_cardart_prim_323x203/mobile.png",
    category: "App & Services",
    rating: 4.7,
    description: "Capital One Credit Card - $899 Balance",
    subcategory: "Credit Cards",
  },
  {
    id: "6",
    name: "Capital One Credit Card",
    price: 200,
    amount: "$600",
    image: "https://ecm.capitalone.com/WCM/card/products/plat_cardart_prim_323x203/mobile.png",
    category: "App & Services",
    rating: 4.7,
    description: "Capital One Credit Card - $1400 Balance",
    subcategory: "Credit Cards",
  },
  {
  id: "7",
  name: "Discovery Bank Credit Card",
  price: 600,
  amount: "$600",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEekOSAerEaNBuxM0hIMbN0bUYFY7Ta0En_w&s",
  category: "Finance",
  rating: 4.9,
  description: "Discovery Bank Credit Card - $600 Balance",
  subcategory: "Credit Cards",
  soldOut: true,  // Add this flag
},
  {
    id: "8",
    name: "Discovery Bank Credit Card",
    price: "Sold-Out",
    amount: "$666",
    image: "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEekOSAerEaNBuxM0hIMbN0bUYFY7Ta0En_w&s",
    category: "Finance",
    rating: 4.9,
    description: "Discovery Bank Credit Card - $666 Balance",
    subcategory: "Credit Cards",
    soldOut: true,  // Add this flag
  },
  {
    id: "9",
    name: "Discovery Bank Credit Card",
    price: 200,
    amount: "$666",
    image: "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEekOSAerEaNBuxM0hIMbN0bUYFY7Ta0En_w&s",
    category: "Finance",
    rating: 4.9,
    description: "Discovery Bank Credit Card - $777 Balance",
    subcategory: "Credit Cards",
  },
  {
    id: "10",
    name: "Citi Bank Credit Card",
    price: 200,
    amount: "$300",
    image: "https://www.shutterstock.com/image-photo/ranchiind…june-29-2023closeup-citibank-600nw-2408305117.jpg",
    category: "Finance",
    rating: 4.8,
    description: "Citi Bank Credit Card - $600 Balance",
    subcategory: "Credit Cards",
  },
  {
    id: "11",
    name: "Citi Bank Credit Card",
    price: "Sold-Out",
    amount: "$666",
    image: "https://www.shutterstock.com/image-photo/ranchiind…june-29-2023closeup-citibank-600nw-2408305117.jpg",
    category: "Finance",
    rating: 4.8,
    description: "Citi Bank Credit Card - $777 Balance",
    subcategory: "Credit Cards",
  },
  {
    id: "12",
    name: "Citi Bank Credit Card",
    price: 200,
    amount: "$600",
    image: "https://www.shutterstock.com/image-photo/ranchiind…june-29-2023closeup-citibank-600nw-2408305117.jpg",
    category: "Finance",
    rating: 4.8,
    description: "Citi Bank Credit Card - $600 Balance",
    subcategory: "Credit Cards",
  },
  {
    id: "13",
    name: "Mercury Credit Card",
    price: "Sold-Out",
    amount: "$500",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsnU0UKEVDfhrw5yXQ_pEa9WRc-0ZYc1Xssw&s",
    category: "App & Services",
    rating: 4.6,
    description: "Mercury Credit Card - $500 Balance",
    subcategory: "Credit Cards",
    soldOut: true,  // Add this flag
  },
  {
    id: "14",
    name: "Mercury Credit Card",
    price: "Sold-Out",
    amount: "$500",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsnU0UKEVDfhrw5yXQ_pEa9WRc-0ZYc1Xssw&s",
    category: "App & Services",
    rating: 4.6,
    description: "Mercury Credit Card - $500 Balance",
    subcategory: "Credit Cards",
    soldOut: true,  // Add this flag
  },
  {
    id: "15",
    name: "Mercury Credit Card",
    price: "Sold-Out",
    amount: "$700",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsnU0UKEVDfhrw5yXQ_pEa9WRc-0ZYc1Xssw&s",
    category: "App & Services",
    rating: 4.6,
    description: "Mercury Credit Card - $700 Balance",
    subcategory: "Credit Cards",
    soldOut: true,  // Add this flag
  },

  // Bank Logs Section
  {
    id: "16",
    name: "Arvest Bank Logs",
    price: 250,
    amount: "10k-30k",
    image: "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNv7YLdYr1Ovq0hzIuWYksybKcXGdxczwDQg&s",
    category: "Finance",
    rating: 4.7,
    description: "Arvest Bank Logs - $10k-$30k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "17",
    name: "Arvest Bank Logs",
    price: 320,
    amount: "20k-40k",
    image: "	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNv7YLdYr1Ovq0hzIuWYksybKcXGdxczwDQg&s",
    category: "Finance",
    rating: 4.7,
    description: "Arvest Bank Logs - $20k-$40k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "18",
    name: "Wells Fargo Bank Logs",
    price: 250,
    amount: "10k-30k",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80",
    category: "Finance",
    rating: 4.9,
    description: "Wells Fargo Bank Logs - $10k-$30k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "19",
    name: "Wells Fargo Bank Logs",
    price: 160,
    amount: "10k-20k",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80",
    category: "Finance",
    rating: 4.9,
    description: "Wells Fargo Bank Logs - $10k-$20k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "20",
    name: "Citi Bank Logs",
    price: 350,
    amount: "15k-35k",
    image: "https://www.shutterstock.com/image-photo/ranchiind…june-29-2023closeup-citibank-600nw-2408305117.jpg",
    category: "Finance",
    rating: 4.8,
    description: "Citi Bank Logs - $15k-$35k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "21",
    name: "Citi Bank Logs",
    price: 160,
    amount: "10k-20k",
    image: "https://www.shutterstock.com/image-photo/ranchiind…june-29-2023closeup-citibank-600nw-2408305117.jpg",
    category: "Finance",
    rating: 4.8,
    description: "Citi Bank Logs - $10k-$20k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "22",
    name: "Truist Bank Logs",
    price: 160,
    amount: "10k-20k",
    image: "https://mma.prnewswire.com/media/1075419/TruistPurpleLogo.jpg?w=2700",
    category: "Finance",
    rating: 4.7,
    description: "Truist Bank Logs - $10k-$20k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "23",
    name: "Truist Bank Logs",
    price: 320,
    amount: "15k",
    image: "https://mma.prnewswire.com/media/1075419/TruistPurpleLogo.jpg?w=2700",
    category: "Finance",
    rating: 4.7,
    description: "Truist Bank Logs - $15k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "24",
    name: "Truist Bank Logs",
    price: 700,
    amount: "20k",
    image: "https://mma.prnewswire.com/media/1075419/TruistPurpleLogo.jpg?w=2700",
    category: "Finance",
    rating: 4.7,
    description: "Truist Bank Logs - $20k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "25",
    name: "Regions Bank Logs",
    price: 210,
    amount: "10k-30k",
    image: "https://images.seeklogo.com/logo-png/40/1/regions-bank-logo-png_seeklogo-402507.png",
    category: "Finance",
    rating: 4.6,
    description: "Regions Bank Logs - $10k-$30k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "26",
    name: "Regions Bank Logs",
    price: 320,
    amount: "20k-40k",
    image: "https://images.seeklogo.com/logo-png/40/1/regions-bank-logo-png_seeklogo-402507.png",
    category: "Finance",
    rating: 4.6,
    description: "Regions Bank Logs - $20k-$40k Balance",
    subcategory: "Bank Logs",
  },
  {
    id: "27",
    name: "Regions Bank Logs",
    price: 700,
    amount: "30k",
    image: "https://images.seeklogo.com/logo-png/40/1/regions-bank-logo-png_seeklogo-402507.png",
    category: "Finance",
    rating: 4.6,
    description: "Regions Bank Logs - $30k Balance",
    subcategory: "Bank Logs",
  },
]

const CATEGORIES = ["All", "Credit Cards", "Bank Logs"]

export default function ShopPage() {
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [addedId, setAddedId] = useState<string | null>(null)

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.subcategory === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return b.rating - a.rating
    return 0
  })

  const handleAddToCart = (product: (typeof ALL_PRODUCTS)[0]) => {
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">Shop Digital Products</h1>
            <p className="text-lg text-muted-foreground text-balance">
              Browse our collection of instant digital cards, credit cards, and bank logs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <Card className="border border-border p-6 sticky top-24 bg-card">
                <div className="flex items-center justify-between lg:block mb-4 lg:mb-0">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                  </Button>
                </div>

                {/* Desktop filters always visible, mobile filters toggle */}
                <div className={`space-y-6 ${!isFilterOpen ? "hidden lg:block" : ""}`}>
                  {/* Categories */}
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-3">Category</h4>
                    <div className="space-y-2">
                      {CATEGORIES.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`block text-sm w-full text-left px-3 py-2 rounded transition-colors ${
                            selectedCategory === category
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="border-t border-border pt-6">
                    <h4 className="font-semibold text-sm text-foreground mb-3">Price Range</h4>
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">$10 - $700</p>
                      <input type="range" min="10" max="700" className="w-full" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="border-t border-border pt-6">
                    <h4 className="font-semibold text-sm text-foreground mb-3">Rating</h4>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((stars) => (
                        <label key={stars} className="flex items-center gap-2 cursor-pointer text-sm">
                          <input type="checkbox" className="rounded" />
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < stars ? "fill-primary text-primary" : "text-border"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">& up</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-border hover:bg-secondary text-foreground mt-6 bg-transparent"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("All")
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Search and Sort */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-input border-border text-foreground"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Results Count */}
              <p className="text-sm text-muted-foreground mb-6">
                Showing {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
              </p>

              {/* Products Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {sortedProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border group bg-card"
                    >
                      <div className="aspect-square bg-secondary overflow-hidden relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                          {product.subcategory}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.amount}</p>

                        <div className="flex items-center gap-1 mb-4">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{product.rating}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
<span className={`text-2xl font-bold ${product.soldOut ? "text-red-500" : "text-primary"}`}>
  {product.soldOut 
    ? "SOLD OUT" 
    : `$${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}`
  }
</span>
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
              ) : (
                <Card className="border border-border p-12 text-center bg-card">
                  <p className="text-lg text-muted-foreground mb-4">No products found</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("All")
                    }}
                    className="border-border hover:bg-secondary text-foreground bg-transparent"
                  >
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
