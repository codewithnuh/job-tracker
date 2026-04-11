"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"

export function LandingProblem() {
  const { problem } = LANDING_CONTENT

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            {problem.badge}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {problem.headline}
          </h2>
          <p className="text-lg text-muted-foreground">{problem.subheadline}</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {problem.painPoints.map((point, index) => (
            <Card
              key={index}
              className="border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20"
            >
              <CardContent className="pt-6">
                <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                  <HugeiconsIcon
                    icon={AlertCircleIcon}
                    strokeWidth={2}
                    className="size-5 text-red-600 dark:text-red-400"
                  />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{point.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
