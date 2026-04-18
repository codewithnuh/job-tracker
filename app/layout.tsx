import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { SWRProvider } from "@/lib/swr"

const interSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: "JobTracker | Advanced Job Application Tracking System",
    template: "%s | JobTracker",
  },
  description:
    "Organize your job hunt with JobTracker. Track applications, manage interviews, and land your dream job with ease using our professional tracking suite.",
  keywords: [
    "job tracker",
    "application tracking",
    "career management",
    "interview tracker",
    "job search tool",
    "professional development",
    "job hunt organizer",
  ],
  authors: [
    {
      name: "Noor Ul Hassan",
      url: "https://noorulhassan.com",
    },
  ],
  creator: "Noor Ul Hassan",
  metadataBase: new URL("https://job-tracker.noorulhassan.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://job-tracker.noorulhassan.com",
    title: "JobTracker | Advanced Job Application Tracking System",
    description:
      "Organize your job hunt with JobTracker. Track applications, manage interviews, and land your dream job with ease.",
    siteName: "JobTracker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JobTracker Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobTracker | Advanced Job Application Tracking System",
    description:
      "Organize your job hunt with JobTracker. Track applications, manage interviews, and land your dream job with ease.",
    images: ["/og-image.png"],
    creator: "@noorulhassan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interSans.variable} font-sans antialiased`}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <SWRProvider>{children}</SWRProvider>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
