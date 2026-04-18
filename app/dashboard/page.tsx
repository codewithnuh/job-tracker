import type { Metadata } from "next"
import { DashboardContent } from "./dashboard-content"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your job applications and track your progress.",
}

export default function DashboardPage() {
  return <DashboardContent />
}
