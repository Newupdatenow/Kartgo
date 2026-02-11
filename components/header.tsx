"use client"

import { ShoppingCart, Menu, X, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.length
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    try {
      const flag = localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(flag)
    } catch (e) {
      setIsLoggedIn(false)
    }
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem("isLoggedIn")
    } catch (e) {
      // ignore
    }
    setIsLoggedIn(false)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            KartaGo
          </Link>

          <div className="hidden md:flex flex-1 mx-8 items-center bg-secondary rounded-full px-4 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for cards..."
              className="flex-1 ml-3 bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/account">
                  <Button variant="ghost" className="text-foreground hover:text-primary">
                    Account
                  </Button>
                </Link>
                <Button variant="ghost" className="text-foreground hover:text-primary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Login
                </Button>
              </Link>
            )}
            <Link href="/cart">
              <Button
                variant="outline"
                size="icon"
                className="relative border-primary hover:bg-secondary bg-transparent"
              >
                <ShoppingCart className="w-5 h-5 text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-8 border-t border-border pt-4">
          <Link href="/" className="text-foreground hover:text-primary transition-colors font-semibold">
            HOME
          </Link>
          <Link href="/shop" className="text-foreground hover:text-primary transition-colors font-semibold">
            PRODUCTS
          </Link>
          <Link href="/blogs" className="text-foreground hover:text-primary transition-colors font-semibold">
            BLOGS
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-semibold">
            CONTACT US
          </Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="flex flex-col gap-2 p-4">
            <Link href="/" className="text-foreground hover:text-primary transition-colors py-2 font-semibold">
              HOME
            </Link>
            <Link href="/shop" className="text-foreground hover:text-primary transition-colors py-2 font-semibold">
              PRODUCTS
            </Link>
            <Link href="/blogs" className="text-foreground hover:text-primary transition-colors py-2 font-semibold">
              BLOGS
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors py-2 font-semibold">
              CONTACT US
            </Link>
            <Link
              href="/auth/login"
              className="text-foreground hover:text-primary transition-colors py-2 font-semibold"
            >
              LOGIN
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
