"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import { QuotesIcon } from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

export function LandingTestimonials() {
  const { testimonials } = LANDING_CONTENT

  const items = testimonials.items.map((item) => ({
    quote: item.quote,
    name: item.name,
    title: item.role,
  }))

  return (
    <section id="testimonials" className="bg-muted/30 py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            {testimonials.badge}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {testimonials.headline}
          </h2>
          <p className="text-lg text-muted-foreground">
            {testimonials.subheadline}
          </p>
        </div>

        <InfiniteMovingCards
          items={items}
          direction="left"
          speed="normal"
          pauseOnHover={true}
          className="py-8"
        />
      </div>
    </section>
  )
}
