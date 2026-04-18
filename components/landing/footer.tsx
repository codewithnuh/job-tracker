"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { BriefcaseIcon } from "@hugeicons/core-free-icons"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"
import { Container } from "@/components/primitives/container"
import { cn } from "@/lib/utils"

export function LandingFooter() {
  const { footer } = LANDING_CONTENT

  return (
    <footer className="relative border-t border-border bg-background py-16">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:24px_24px]",
          "[background-image:radial-gradient(#e5e5e5_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#262626_1px,transparent_1px)]"
        )}
      />

      <Container className="relative">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="group mb-6 flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all group-hover:bg-primary/90">
                <HugeiconsIcon
                  icon={BriefcaseIcon}
                  strokeWidth={2}
                  className="size-5"
                />
              </div>
              <span className="text-xl font-black uppercase tracking-tight">
                JobTracker
              </span>
            </Link>
            <p className="text-base font-medium leading-relaxed text-muted-foreground">
              {footer.tagline}
            </p>
          </div>

          {footer.links.map((group, index) => (
            <div key={index}>
              <h4 className="mb-5 text-sm font-black uppercase tracking-wider">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.items.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="relative text-base font-medium text-muted-foreground transition-all after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:text-foreground hover:after:w-full"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
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

        <div className="flex flex-col items-center justify-between gap-4 text-sm font-medium text-muted-foreground md:flex-row">
          <p className="text-center md:text-left">{footer.copyright}</p>
          <div className="flex items-center gap-6">
            <span className="text-xs font-black uppercase tracking-wider">
              Built with care for job seekers everywhere
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}