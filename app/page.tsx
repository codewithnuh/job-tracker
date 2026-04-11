import React from "react"
import { LandingNavbar } from "@/components/landing/navbar"
import { LandingHero } from "@/components/landing/hero"
import { LandingStatsBar } from "@/components/landing/stats-bar"
import { LandingProblem } from "@/components/landing/problem-section"
import { LandingFeatures } from "@/components/landing/features-bento"
import { LandingHowItWorks } from "@/components/landing/how-it-works"
import { LandingTestimonials } from "@/components/landing/testimonials"
import { LandingFAQ } from "@/components/landing/faq"
import { LandingCTA } from "@/components/landing/cta"
import { LandingFooter } from "@/components/landing/footer"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"

export const metadata = {
  title: LANDING_CONTENT.meta.title,
  description: LANDING_CONTENT.meta.description,
}

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background antialiased">
      <LandingNavbar />

      <div className="relative mx-auto max-w-7xl pt-4 antialiased">
        <LandingHero />
        <LandingStatsBar />
        <LandingProblem />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingTestimonials />
        <LandingFAQ />
        <LandingCTA />
      </div>

      <LandingFooter />
    </main>
  )
}
