"use client"

import { Badge } from "@/components/ui/badge"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"

export function LandingHowItWorks() {
  const { howItWorks } = LANDING_CONTENT

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            {howItWorks.badge}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {howItWorks.headline}
          </h2>
          <p className="text-lg text-muted-foreground">
            {howItWorks.subheadline}
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {howItWorks.steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {step.number}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {index < howItWorks.steps.length - 1 && (
                <div className="absolute top-7 left-[60%] hidden h-px w-[80%] bg-border md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
