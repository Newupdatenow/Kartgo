"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, User, LogOut, Settings, Edit2, Save } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
  })

  const [tempProfile, setTempProfile] = useState(profile)

  const handleSave = () => {
    setProfile(tempProfile)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">My Account</h1>
            <p className="text-muted-foreground">Manage your profile and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-2 p-6 border border-border bg-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Profile Information
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isEditing) {
                      handleSave()
                    } else {
                      setTempProfile(profile)
                      setIsEditing(true)
                    }
                  }}
                  className="border-border hover:bg-secondary text-foreground bg-transparent"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <Input
                    type="text"
                    value={tempProfile.fullName}
                    onChange={(e) => setTempProfile({ ...tempProfile, fullName: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1 bg-input border-border text-foreground disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <Input
                    type="email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1 bg-input border-border text-foreground disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                  <Input
                    type="tel"
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1 bg-input border-border text-foreground disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Country</label>
                  <Input
                    type="text"
                    value={tempProfile.country}
                    onChange={(e) => setTempProfile({ ...tempProfile, country: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1 bg-input border-border text-foreground disabled:opacity-50"
                  />
                </div>

                {isEditing && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      setTempProfile(profile)
                    }}
                    className="w-full border-border hover:bg-secondary text-foreground bg-transparent mt-4"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Stats */}
              <Card className="p-6 border border-border bg-card">
                <h3 className="font-semibold text-foreground mb-4">Account Stats</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold text-primary">12</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                    <p className="text-2xl font-bold text-primary">$847.50</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm text-foreground">June 15, 2024</p>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 border border-border space-y-3 bg-card">
                <Button
                  variant="outline"
                  className="w-full justify-start border-border hover:bg-secondary text-foreground bg-transparent"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-border hover:bg-secondary text-foreground bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Security & Privacy
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
