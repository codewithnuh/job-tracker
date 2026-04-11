"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HugeiconsIcon } from "@hugeicons/react"
import { QuotesIcon } from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"

export function LandingTestimonials() {
  const { testimonials } = LANDING_CONTENT

  return (
    <section id="testimonials" className="bg-muted/30 py-20 md:py-28">
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

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {testimonials.items.map((testimonial, index) => (
            <Card key={index} className="border-0 bg-background shadow-sm">
              <CardContent className="p-6">
                <HugeiconsIcon
                  icon={QuotesIcon}
                  strokeWidth={1.5}
                  className="mb-4 size-8 text-primary/20"
                />
                <p className="mb-6 leading-relaxed text-foreground italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
