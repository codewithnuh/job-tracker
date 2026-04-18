import { LegalPageLayout } from "@/components/legal-page-layout"

export const metadata = {
  title: "About Us - JobTracker",
  description: "The story behind JobTracker and our mission to help job seekers tracking their job search journey.",
}

export default function AboutPage() {
  const h2Classes = "text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6"
  const pClasses = "text-lg leading-relaxed text-muted-foreground mb-6"
  const listClasses = "list-disc pl-6 space-y-2 text-muted-foreground mb-8 text-lg"

  return (
    <LegalPageLayout title="About JobTracker" lastUpdated="April 18, 2026">
      <section>
        <h2 className={h2Classes}>Our Mission</h2>
        <p className={pClasses}>
          JobTracker was born out of <strong className="text-foreground">pure frustration</strong>. Like many of you, we spent weeks applying for jobs, only to find our tracking spreadsheets becoming unmanageable, our follow-ups slipping through the cracks, and our motivation drained by organizational chaos.
        </p>
        <p className={pClasses}>
          Our mission is simple: <strong className="text-foreground">To turn job search chaos into clarity</strong>. We believe that job seekers already have enough to worry about—polishing resumes, preparing for interviews, and networking. Organization should be the easy part.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>Built by Job Seekers, for Job Seekers</h2>
        <p className={pClasses}>
          We aren't a massive corporation. We're a small, passionate team of developers and designers in Pakistan who wanted to build the tool we wish we had when we were searching for our own roles.
        </p>
      </section>

      <section>
        <h2 className={h2Classes}>Why Choose JobTracker?</h2>
        <ul className={listClasses}>
          <li><strong className="text-foreground">Focus on Speed:</strong> We know you're busy. Updating a status should take seconds, not minutes.</li>
          <li><strong className="text-foreground">Visual First:</strong> Our pipeline view gives you instant psychological reinforcement by showing you exactly how much progress you've made.</li>
          <li><strong className="text-foreground">Data-Driven:</strong> We provide the stats you need to understand where your search is working and where it needs adjustment.</li>
          <li><strong className="text-foreground">Privacy First:</strong> We never sell your data. Period.</li>
        </ul >
      </section>

      <section>
        <h2 className={h2Classes}>Join Us on the Journey</h2>
        <p className={pClasses}>
          We're just getting started. We have a long roadmap of features planned—from automated reminder notifications to AI-powered interview prep tools. But we'll always keep our core application tracking free and simple.
        </p>
        <p className={pClasses}>
          Happy hunting! <br /> <strong className="text-foreground">— The JobTracker Team</strong>
        </p>
      </section>
    </LegalPageLayout>
  )
}
