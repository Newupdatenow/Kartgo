"use client"

import { ArrowRight, Calendar, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function BlogsPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Bitcoin: A Beginner's Guide",
      excerpt:
        "Learn the fundamentals of Bitcoin, how blockchain technology works, and why it's revolutionizing digital payments.",
      date: "November 20, 2024",
      author: "Alex Chen",
      image: "/placeholder.svg?key=pgzn1",
      category: "Crypto Education",
      readTime: "8 min read",
    },
    {
      id: 2,
      title: "Ethereum vs Bitcoin: Key Differences Explained",
      excerpt:
        "Discover the differences between Ethereum and Bitcoin, their use cases, and how they work together in the crypto ecosystem.",
      date: "November 18, 2024",
      author: "Sarah Williams",
      image: "/placeholder.svg?key=n6ssl",
      category: "Comparison",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "How to Secure Your Cryptocurrency Wallet",
      excerpt:
        "Essential tips and best practices to protect your digital assets and keep your cryptocurrency wallet safe from threats.",
      date: "November 15, 2024",
      author: "Mike Johnson",
      image: "/placeholder.svg?key=b3yb4",
      category: "Security",
      readTime: "7 min read",
    },
    {
      id: 4,
      title: "The Future of Decentralized Finance (DeFi)",
      excerpt:
        "Explore the emerging world of DeFi, its potential impact on traditional finance, and investment opportunities.",
      date: "November 12, 2024",
      author: "Emma Davis",
      image: "/placeholder.svg?key=e7kyi",
      category: "Trends",
      readTime: "10 min read",
    },
    {
      id: 5,
      title: "Crypto Trading Strategies for Beginners",
      excerpt:
        "Learn fundamental trading strategies, risk management, and how to make informed decisions in the crypto market.",
      date: "November 10, 2024",
      author: "James Wilson",
      image: "/placeholder.svg?key=3whz2",
      category: "Trading",
      readTime: "9 min read",
    },
    {
      id: 6,
      title: "NFTs Explained: More Than Just Digital Art",
      excerpt:
        "Understand what NFTs are, their real-world applications beyond art, and how they're changing various industries.",
      date: "November 8, 2024",
      author: "Lisa Anderson",
      image: "/placeholder.svg?key=bn02q",
      category: "Web3",
      readTime: "6 min read",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Crypto Knowledge Hub</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest insights, guides, and trends in cryptocurrency and blockchain technology
            </p>
          </div>

          {/* Featured Post */}
          <Card className="mb-12 border border-border overflow-hidden bg-card hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto bg-secondary">
                <img src="/placeholder.svg?key=zuxr2" alt="Featured" className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  The Complete Guide to Cryptocurrency Payments
                </h2>
                <p className="text-muted-foreground mb-6">
                  Discover how cryptocurrency is transforming digital payments, why businesses are adopting it, and how
                  you can start using crypto for transactions today.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    November 22, 2024
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Tom Harris
                  </div>
                  <span>12 min read</span>
                </div>
                <Link href="/blogs/featured">
                  <Button className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground">
                    Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Blog Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="border border-border overflow-hidden bg-card hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="relative h-48 bg-secondary overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-accent font-semibold">{post.readTime}</span>
                      <Link href={`/blogs/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          Read More <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <Card className="border border-border bg-gradient-to-r from-primary/20 to-accent/20 p-12 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for weekly crypto insights and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Subscribe
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
