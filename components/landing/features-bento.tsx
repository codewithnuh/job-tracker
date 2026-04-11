"use client"

import { Badge } from "@/components/ui/badge"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BriefcaseIcon,
  Settings01Icon,
  Clock03Icon,
  ChartIcon,
  CheckmarkCircle02Icon,
  Link02Icon,
} from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

const iconMap: Record<string, typeof BriefcaseIcon> = {
  Briefcase: BriefcaseIcon,
  Pipeline: Settings01Icon,
  Timeline: Clock03Icon,
  Chart: ChartIcon,
  Zap: CheckmarkCircle02Icon,
  Link: Link02Icon,
}

export function LandingFeatures() {
  const { features } = LANDING_CONTENT

  return (
    <section id="features" className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            {features.badge}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {features.headline}
          </h2>
          <p className="text-lg text-muted-foreground">
            {features.subheadline}
          </p>
        </div>

        <BentoGrid className="mx-auto max-w-5xl">
          {features.items.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || BriefcaseIcon
            return (
              <BentoGridItem
                key={index}
                className={cn(
                  feature.className,
                  "bg-gradient-to-br from-background to-muted/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                )}
                icon={
                  <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                    <HugeiconsIcon
                      icon={IconComponent}
                      strokeWidth={2}
                      className="size-6 text-primary"
                    />
                  </div>
                }
                title={<h3 className="text-lg font-semibold">{feature.title}</h3>}
                description={
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                }
              />
            )
          })}
        </BentoGrid>
      </div>
    </section>
  )
}
