"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { BriefcaseIcon } from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"

export function LandingFooter() {
  const { footer } = LANDING_CONTENT

  return (
    <footer className="border-t py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary">
                <HugeiconsIcon
                  icon={BriefcaseIcon}
                  strokeWidth={2}
                  className="size-5 text-primary-foreground"
                />
              </div>
              <span className="text-base font-semibold">JobTracker</span>
            </Link>
            <p className="text-sm text-muted-foreground">{footer.tagline}</p>
          </div>

          {footer.links.map((group, index) => (
            <div key={index}>
              <h4 className="mb-4 text-sm font-semibold">{group.title}</h4>
              <ul className="space-y-2">
                {group.items.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
