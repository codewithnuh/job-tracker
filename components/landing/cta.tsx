"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"

export function LandingCTA() {
  const { cta } = LANDING_CONTENT

  return (
    <section className="relative overflow-hidden py-20 text-primary-foreground md:py-28">
      <BackgroundGradientAnimation
        containerClassName="absolute inset-0"
        className="relative z-10 flex flex-col items-center justify-center py-20"
        gradientBackgroundStart="rgb(30, 41, 59)"
        gradientBackgroundEnd="rgb(15, 23, 42)"
        firstColor="59, 130, 246"
        secondColor="139, 92, 246"
        thirdColor="236, 72, 153"
        fourthColor="34, 197, 94"
        fifthColor="251, 191, 36"
        pointerColor="59, 130, 246"
      >
        <div className="container mx-auto px-4 text-center z-20">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-white">
            {cta.headline}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-gray-300">
            {cta.subheadline}
          </p>
          <Button
            size="lg"
            asChild
            className="gap-2 bg-white text-slate-900 hover:bg-gray-100"
          >
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
      </BackgroundGradientAnimation>
    </section>
  )
}
