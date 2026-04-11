"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, PlayCircleIcon } from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { Spotlight } from "@/components/ui/spotlight-new"

export function LandingHero() {
  const { hero } = LANDING_CONTENT

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      <Spotlight className="hidden md:block" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(120,119,198,0.08),transparent)]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-sm font-medium"
          >
            {hero.badge}
          </Badge>

          <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>

          <p className="mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {hero.subheadline}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link href={hero.ctaHref}>
                {hero.cta}
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  strokeWidth={2}
                  className="size-4"
                />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link href={hero.secondaryCtaHref}>
                <HugeiconsIcon
                  icon={PlayCircleIcon}
                  strokeWidth={2}
                  className="size-4"
                />
                {hero.secondaryCta}
              </Link>
            </Button>
          </div>

          <div className="mt-16 w-full max-w-5xl">
            <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl">
              <div className="absolute top-0 right-0 left-0 flex h-10 items-center gap-2 border-b bg-muted/50 px-4">
                <div className="size-3 rounded-full bg-red-500/80" />
                <div className="size-3 rounded-full bg-yellow-500/80" />
                <div className="size-3 rounded-full bg-green-500/80" />
              </div>
              <div className="px-6 pt-12 pb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <span className="text-sm font-semibold text-blue-600">
                        G
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Google</p>
                      <p className="text-sm text-muted-foreground">
                        Software Engineer
                      </p>
                    </div>
                    <div className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-600">
                      Interview
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
                      <span className="text-sm font-semibold text-emerald-600">
                        M
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Meta</p>
                      <p className="text-sm text-muted-foreground">
                        Product Manager
                      </p>
                    </div>
                    <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600">
                      Applied
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10">
                      <span className="text-sm font-semibold text-amber-600">
                        A
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Amazon</p>
                      <p className="text-sm text-muted-foreground">
                        Data Analyst
                      </p>
                    </div>
                    <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                      Offer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
