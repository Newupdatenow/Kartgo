"use client"

import { ShoppingCart, Menu, X, Search, LogOut, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCart } from "@/context/cart-context"

export default function HeaderAuthenticated() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.length

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/dashboard" className="text-2xl font-bold text-primary">
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

            {/* User Menu Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-primary"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User className="w-5 h-5" />
              </Button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-foreground hover:bg-secondary first:rounded-t-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-foreground hover:bg-secondary transition-colors"
                  >
                    My Account
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-foreground hover:bg-secondary transition-colors">
                    Order History
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-destructive hover:bg-secondary last:rounded-b-lg transition-colors flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-8 border-t border-border pt-4">
          <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors font-semibold">
            DASHBOARD
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
            <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors py-2 font-semibold">
              DASHBOARD
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
            <button className="text-destructive hover:text-primary transition-colors py-2 font-semibold text-left">
              SIGN OUT
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
