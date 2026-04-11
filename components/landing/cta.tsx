"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"

export function LandingCTA() {
  const { cta } = LANDING_CONTENT

  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-28">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">{cta.headline}</h2>
        <p className="mx-auto mb-10 max-w-xl text-lg opacity-90">
          {cta.subheadline}
        </p>
        <Button size="lg" variant="secondary" asChild className="gap-2">
          <Link href={cta.buttonHref}>
            {cta.button}
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              className="size-4"
            />
          </Link>
        </Button>
      </div>
    </section>
  )
}
