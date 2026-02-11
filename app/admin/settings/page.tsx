"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Check, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function AdminSettingsPage() {
  const [adminEmail, setAdminEmail] = useState("")
  const [savedEmail, setSavedEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState("")

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Load admin email from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kartago-admin-email")
    if (saved) {
      setAdminEmail(saved)
      setSavedEmail(saved)
    }
  }, [])

  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setIsSaved(false)

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(adminEmail)) {
        setError("Please enter a valid email address")
        setIsLoading(false)
        return
      }

      // Save to localStorage
      localStorage.setItem("kartago-admin-email", adminEmail)
      setSavedEmail(adminEmail)
      setIsSaved(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    } catch (err) {
      setError("Failed to save email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangingPassword(true)
    setPasswordError("")
    setPasswordSuccess(false)

    try {
      // Validation
      if (!passwordForm.currentPassword) {
        setPasswordError("Please enter your current password")
        setIsChangingPassword(false)
        return
      }

      if (passwordForm.newPassword.length < 8) {
        setPasswordError("New password must be at least 8 characters long")
        setIsChangingPassword(false)
        return
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setPasswordError("New passwords do not match")
        setIsChangingPassword(false)
        return
      }

      // Verify current password (stored in localStorage)
      const storedPassword = localStorage.getItem("kartago-admin-password")
      if (storedPassword && passwordForm.currentPassword !== storedPassword) {
        setPasswordError("Current password is incorrect")
        setIsChangingPassword(false)
        return
      }

      // Save new password to localStorage
      localStorage.setItem("kartago-admin-password", passwordForm.newPassword)

      setPasswordSuccess(true)
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })

      setTimeout(() => {
        setPasswordSuccess(false)
      }, 3000)
    } catch (err) {
      setPasswordError("Failed to change password. Please try again.")
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <Link href="/admin" className="text-muted-foreground hover:text-foreground text-sm mb-2 inline-block">
              ← Back to Admin
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Admin Settings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Email Configuration Card */}
          <Card className="p-6 md:p-8 border border-border bg-card">
            <h2 className="text-2xl font-bold text-foreground mb-2">Email Configuration</h2>
            <p className="text-muted-foreground mb-6">
              Set the email address where you want to receive order notifications and payment confirmations.
            </p>

            <form onSubmit={handleSaveEmail} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">Admin Email Address</label>
                <p className="text-xs text-muted-foreground mb-3">
                  You will receive order notifications at this email whenever a customer completes a purchase.
                </p>
                <Input
                  type="email"
                  placeholder="admin@kartago.com"
                  value={adminEmail}
                  onChange={(e) => {
                    setAdminEmail(e.target.value)
                    setError("")
                  }}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>

              {error && (
                <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {isSaved && (
                <div className="flex items-start gap-3 bg-accent/10 border border-accent/30 p-4 rounded-lg">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-accent font-semibold">Email saved successfully!</p>
                    <p className="text-xs text-accent/80">
                      You will now receive order notifications at <span className="font-semibold">{savedEmail}</span>
                    </p>
                  </div>
                </div>
              )}

              {savedEmail && !isSaved && (
                <div className="bg-secondary p-4 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Currently configured email:</p>
                  <p className="text-sm font-semibold text-foreground">{savedEmail}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || !adminEmail}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? "Saving..." : "Save Email Configuration"}
              </Button>
            </form>
          </Card>

          {/* Password Management Card */}
          <Card className="p-6 md:p-8 border border-border bg-card">
            <h2 className="text-2xl font-bold text-foreground mb-2">Password Management</h2>
            <p className="text-muted-foreground mb-6">Change your admin portal password to keep your account secure.</p>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">Current Password</label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => {
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      setPasswordError("")
                    }}
                    className="bg-input border-border text-foreground pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground">New Password</label>
                  <div className="relative">
                    <Input
                      type={showPasswords.new ? "text" : "password"}
                      placeholder="Enter new password (min 8 characters)"
                      value={passwordForm.newPassword}
                      onChange={(e) => {
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                        setPasswordError("")
                      }}
                      className="bg-input border-border text-foreground pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-foreground">Confirm Password</label>
                  <div className="relative">
                    <Input
                      type={showPasswords.confirm ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => {
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                        setPasswordError("")
                      }}
                      className="bg-input border-border text-foreground pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {passwordError && (
                <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{passwordError}</p>
                </div>
              )}

              {passwordSuccess && (
                <div className="flex items-start gap-3 bg-accent/10 border border-accent/30 p-4 rounded-lg">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-accent font-semibold">Password changed successfully!</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isChangingPassword}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 flex items-center justify-center gap-2"
              >
                {isChangingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                {isChangingPassword ? "Changing Password..." : "Change Password"}
              </Button>
            </form>
          </Card>

          {/* Information Card */}
          <Card className="p-6 border border-border bg-card space-y-4">
            <h3 className="font-semibold text-foreground">Setup Instructions</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-accent font-bold flex-shrink-0">1.</span>
                <span>Save your email address above to receive order notifications</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold flex-shrink-0">2.</span>
                <span>Set a secure password to protect your admin account</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold flex-shrink-0">3.</span>
                <span>When customers complete purchases, orders will appear in the admin dashboard</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold flex-shrink-0">4.</span>
                <span>Check the Orders section to view all customer transactions and details</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  )
}
