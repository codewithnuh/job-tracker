"use client "

export const LANDING_CONTENT = {
  meta: {
    title: "JobTracker - Track Your Job Search Without the Chaos",
    description:
      "From Applied to Offer Accepted — keep every opportunity organized, every interview prepped, and every follow-up tracked.",
  },

  nav: {
    logo: "JobTracker",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Start Tracking Free",
    ctaHref: "/register",
  },

  hero: {
    badge: "Your job search, organized ✨",
    headline: "Track Your Job Search Without the Chaos",
    subheadline:
      "From 'Applied' to 'Offer Accepted' — keep every opportunity organized, every interview prepped, and every follow-up tracked. No more spreadsheets. No more lost links. Just clarity.",
    cta: "Start Tracking Free",
    ctaHref: "/register",
    secondaryCta: "See How It Works",
    secondaryCtaHref: "#how-it-works",
  },

  stats: {
    items: [
      { value: "10,000+", label: "Applications Tracked" },
      { value: "5,000+", label: "Job Seekers" },
      { value: "92%", label: "Stay Organized" },
      { value: "15min", label: "Avg. Time Saved/Week" },
    ],
  },

  problem: {
    badge: "Sound familiar?",
    headline: "The Job Search Struggle is Real",
    subheadline:
      "You're applying everywhere, following up on some, prepping for interviews in others. And somewhere in between, you've lost track of what you applied to, when you applied, and what the recruiter said.",
    painPoints: [
      {
        title: "Spreadsheets get messy",
        description:
          "That color-coded Excel sheet looked great on day one. Three weeks later? A chaotic mess of broken formulas and forgotten notes.",
      },
      {
        title: "Emails get buried",
        description:
          "LinkedInEasyApply confirmations vanish. Recruiter follow-ups get lost in your inbox. Important details slip through the cracks.",
      },
      {
        title: "You're losing track",
        description:
          "Did I already apply to this company? What's the status of that interview? When was I supposed to follow up?",
      },
    ],
  },

  features: {
    badge: "Features",
    headline: "Everything You Need to Win Your Job Search",
    subheadline:
      "Simple, focused tools that help you stay organized and feel confident about where you stand.",
    items: [
      {
        title: "Track Every Detail",
        description:
          "Company, role, salary range, location, and the original job posting link — all in one place.",
        icon: "Briefcase",
        className: "md:col-span-2",
      },
      {
        title: "Visual Pipeline",
        description:
          "See your entire job search at a glance. From Applied to Accepted, track your progress through 7 clear stages.",
        icon: "Pipeline",
        className: "md:col-span-1",
      },
      {
        title: "Activity Timeline",
        description:
          "Every status change, every note, every follow-up — logged automatically with timestamps.",
        icon: "Timeline",
        className: "md:col-span-1",
      },
      {
        title: "Interview Stats",
        description:
          "Know your numbers. Track your interview rate, offer rate, and see where you need to focus.",
        icon: "Chart",
        className: "md:col-span-2",
      },
      {
        title: "Quick Updates",
        description:
          "Change a status in seconds. No forms to fill out, no complicated workflows.",
        icon: "Zap",
        className: "md:col-span-1",
      },
      {
        title: "Never Lose a Link",
        description:
          "Store the original job posting URL right with your application. One click and you're there.",
        icon: "Link",
        className: "md:col-span-1",
      },
    ],
  },

  howItWorks: {
    badge: "How It Works",
    headline: "Get Started in Minutes",
    subheadline:
      "No complex setup. No learning curve. Just add your applications and start tracking.",
    steps: [
      {
        number: "1",
        title: "Create Your Free Account",
        description:
          "Sign up in seconds. No credit card, no complicated onboarding. Just you and your job search.",
      },
      {
        number: "2",
        title: "Add Your Applications",
        description:
          "Start adding the jobs you've applied to. Grab the company, role, and paste that job link.",
      },
      {
        number: "3",
        title: "Track Your Progress",
        description:
          "Update statuses as you move forward. Add notes for interviews. Watch your pipeline grow.",
      },
    ],
  },

  testimonials: {
    badge: "Real Results",
    headline: "Job Seekers Who Stopped the Chaos",
    subheadline:
      "From messy spreadsheets and forgotten follow-ups to clear pipelines and landed offers. Here's what actual users are saying.",
    items: [
      {
        quote:
          "I was juggling 50+ applications across LinkedIn, Indeed, and company portals. Everything was scattered — emails, notes, statuses. JobTracker put it all in one place with a clean visual pipeline. I stopped missing follow-ups and actually felt in control for the first time.",
        name: "Ayesha Khan",
        role: "Frontend Developer",
        company: "Lahore",
        result: "Landed 4 interviews in 3 weeks",
        rating: 5,
        avatar: "/avatars/ayesha-khan.jpg", // Replace with real photos later
      },
      {
        quote:
          "The worst part was getting a recruiter call and having no idea which role they were talking about. This tool logs every status change and note automatically. I now go into calls prepared instead of scrambling. Saved me from looking unprofessional multiple times.",
        name: "Bilal Ahmed",
        role: "Product Manager",
        company: "Karachi",
        result: "Closed my first offer in 7 weeks",
        rating: 5,
        avatar: "/avatars/bilal-ahmed.jpg",
      },
      {
        quote:
          "Interview stats showed me I was getting calls but bombing them because I wasn't preparing properly. Now I track every interview, add notes on what went wrong, and see my improvement over time. My confidence went through the roof.",
        name: "Fatima Zahra",
        role: "Data Analyst",
        company: "Islamabad",
        result: "Improved interview-to-offer rate significantly",
        rating: 5,
        avatar: "/avatars/fatima-zahra.jpg",
      },
      {
        quote:
          "As someone applying while working full-time, updating spreadsheets at midnight was killing me. JobTracker's quick status updates and activity timeline cut my weekly tracking time from hours to minutes. I can finally focus on actually preparing instead of organizing.",
        name: "Usman Tariq",
        role: "Backend Engineer",
        company: "Remote",
        result: "Tracked 120+ applications without burnout",
        rating: 4,
        avatar: "/avatars/usman-tariq.jpg",
      },
    ],
  },

  faq: {
    badge: "FAQ",
    headline: "Questions? We've Got Answers",
    items: [
      {
        question: "Is this really free?",
        answer:
          "Yes! The core features are completely free to use. We're here to help job seekers, not drain their wallets.",
      },
      {
        question: "How is this different from a spreadsheet?",
        answer:
          "Spreadsheets work until they don't. We give you a purpose-built system with visual pipelines, automatic activity logs, and analytics — all without fighting Excel formulas.",
      },
      {
        question: "Can I track interviews and offers?",
        answer:
          "Absolutely. You can track every stage from 'Applied' through 'Offer Accepted' (or 'Rejected' — we know it happens). Add notes at each step.",
      },
      {
        question: "What if I need help?",
        answer:
          "We're a small team building this because we needed it ourselves. Reach out anytime and we'll help you get sorted.",
      },
      {
        question: "Is my data private?",
        answer:
          "Your data is yours. We don't sell it, share it, or do anything weird with it. Your job search is personal.",
      },
    ],
  },

  cta: {
    headline: "Ready to Get Organized?",
    subheadline:
      "Join thousands of job seekers who've turned chaos into clarity. Start tracking your applications today — it's free.",
    button: "Start Tracking Free",
    buttonHref: "/register",
  },

  footer: {
    tagline: "Track your job search without the chaos.",
    links: [
      {
        title: "Product",
        items: [
          { label: "Features", href: "#features" },
          { label: "How It Works", href: "#how-it-works" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Company",
        items: [
          { label: "About", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
      {
        title: "Legal",
        items: [
          { label: "Privacy Policy", href: "#" },
          { label: "Terms of Service", href: "#" },
        ],
      },
      {
        title: "Connect",
        items: [
          { label: "GitHub", href: "#" },
          { label: "Twitter", href: "#" },
          { label: "LinkedIn", href: "#" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} JobTracker. All rights reserved. Built with ❤️ for job seekers everywhere.`,
  },
} as const

export type LandingContent = typeof LANDING_CONTENT
