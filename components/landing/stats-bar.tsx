"use client"

import { LANDING_CONTENT } from "@/lib/constants/landing-content"

export function LandingStatsBar() {
  const { stats } = LANDING_CONTENT

  return (
    <section className="border-y bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {stats.items.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-1 text-3xl font-bold text-foreground md:text-4xl">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
