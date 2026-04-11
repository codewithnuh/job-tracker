"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export function AnimatedTestimonials() {
  const t = LANDING_CONTENT.testimonials
  return (
    <section id="testimonials" className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            {t.badge}
          </span>
          <h2 className="mt-2 text-3xl font-bold">{t.headline}</h2>
          <p className="mt-2 text-muted-foreground">{t.subheadline}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.items.map((it, idx) => (
            <Card key={idx} className="bg-background">
              <CardContent className="p-6 text-sm">
                <p className="italic">"{it.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage alt="avatar" />
                  </Avatar>
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {it.role}
                    </div>
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
