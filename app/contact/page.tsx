"use client"

import type React from "react"

import { Mail, MessageCircle, Headphones, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  // Only Telegram support is displayed (email and live chat removed as requested)
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Telegram Support",
      description: "Join our Telegram community for instant support and updates",
      contact: "t.me/verfiedprivateacct",
      action: "https://t.me/verfiedprivateacct",
      actionText: "Join Telegram",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to us 
            </p>
          </div>

          {/* Center the single Telegram card responsively */}
          <div className="grid grid-cols-1 gap-8 mb-12 justify-items-center">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon
              return (
                <Card
                  key={index}
                  className="border border-border bg-card p-8 text-center hover:shadow-lg transition-all"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                  <p className="font-semibold text-foreground mb-6">{method.contact}</p>
                  {method.action.startsWith("http") ? (
                    <a
                      href={method.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${method.title} (${method.contact})`}
                    >
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        {method.actionText}
                      </Button>
                    </a>
                  ) : (
                    <a href={method.action} aria-label={`Open ${method.title} (${method.contact})`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        {method.actionText}
                      </Button>
                    </a>
                  )}
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border border-border bg-card p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-input border-border text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-input border-border text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <Input
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-input border-border text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-input border border-border text-foreground rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={5}
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>

            {/* FAQ & Info */}
            <div className="space-y-8">
              <Card className="border border-border bg-card p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How long does delivery take?</h4>
                    <p className="text-sm text-muted-foreground">
                      Digital cards are delivered instantly via email after payment confirmation.
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Do you accept cryptocurrency?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! We accept Bitcoin and Ethereum for all purchases.
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <h4 className="font-semibold text-foreground mb-2">Is my payment secure?</h4>
                    <p className="text-sm text-muted-foreground">
                      All transactions are encrypted with 256-bit SSL and fraud protection.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border border-border bg-primary/10 p-8">
                <h3 className="text-lg font-bold text-foreground mb-4">Response Time</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-1.5 flex-shrink-0"></div>
                    <p>Telegram: Within 30mins</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
