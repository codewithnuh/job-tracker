import type { Metadata } from "next"
import { StatsContent } from "./stats-content"

export const metadata: Metadata = {
  title: "Statistics",
  description: "Detailed analytics and insights for your job hunt journey.",
}

export default function StatsPage() {
  return <StatsContent />
}
