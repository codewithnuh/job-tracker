"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"

export function BentoGridSection() {
  const items = LANDING_CONTENT.features.items
  return (
    <section id="features" className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            Features
          </span>
          <h2 className="mt-2 text-3xl font-bold">Everything You Need</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it, idx) => (
            <Card key={idx} className="rounded-lg border p-0">
              <CardContent className="p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">
                  {it.title.charAt(0)}
                </div>
                <h3 className="mb-1 text-lg font-semibold">{it.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {it.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
