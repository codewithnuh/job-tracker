import {
  LandingNavbar,
  LandingHero,
  LandingStatsBar,
  LandingProblem,
  LandingFeatures,
  LandingHowItWorks,
  LandingTestimonials,
  LandingFAQ,
  LandingCTA,
  LandingFooter,
} from "@/components/landing"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"

export const metadata = {
  title: LANDING_CONTENT.meta.title,
  description: LANDING_CONTENT.meta.description,
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <LandingNavbar />
      <LandingHero />
      <LandingStatsBar />
      <LandingProblem />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingTestimonials />
      <LandingFAQ />
      <LandingCTA />
      <LandingFooter />
    </main>
  )
}
